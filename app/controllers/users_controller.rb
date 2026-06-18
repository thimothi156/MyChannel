class UsersController < ApplicationController
    before_action :get_user, only:[:login]
    skip_before_action :check_authentication,only: [:login, :authenticate]
    def index
        @users = User.all
    end

    def login
        if Rails.cache.read(user_params[:email]) == params[:code]
            unless @user
                @user = User.new(user_params)
                if !user.save
                    return render json:{errors:@user.errors.full_messages }, status: :unprocessable_entity
                end 
            end
            session[:user_id] = @user.id
            Rails.logger.info "#{params[:email]} login sucessful"
            render json:{message:"login sucessful"},status: :ok
        else
            render json:{error:"invalid secret code"}, status: :unprocessable_entity
        end
    end


    def authenticate
        code = SecureRandom.alphanumeric(6).upcase
        Rails.cache.write("#{params[:email]}",code,expires_in:5.minutes)
        UserMailer.welcome_email(params[:email],code).deliver_later
        head :ok
    end
    
    def user_details
        render json:{user: {id:@current_user.id,first_name: @current_user.first_name}}
    end

    def send_invite
        UserMailer.invite_email(params[:email],@current_user).deliver_later
        head :ok
    end 

    private

    def user_params
        params.permit(:email,:first_name,:last_name)
    end
    
    def get_user
        @user = User.find_by(email: user_params[:email])
    end
end
