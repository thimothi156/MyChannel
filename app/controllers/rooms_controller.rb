class RoomsController < ApplicationController
    def index
        render json:{rooms: @current_user.rooms}
    end

    def show
       room =  Room.find(params[:id])
       room_users_count = room.room_users.count
       messages = room.messages.includes(:user).order(:created_at).limit(5)
       message_data = messages.map{|messsage|
        {
            user: message.user.first_name,
            content: message.content
        }
       }
       render json:{messages: message_data,users_count: room_users_count}
    end
    
    def new
        @room = Room.new
    end

    def create
        room = Room.create(room_params)
        begin
         ActiveRecord::Base.transaction do
           room.save!

           RoomUser.create!(
             room_id: room.id,
             user_id: @current_user.id
           )
         end
        render json: { message: "Room created", room: room }
        rescue ActiveRecord::RecordInvalid => e
          render json: {
            error: e.record.errors.full_messages
          }, status: :unprocessable_entity
        end
    end

    private

    def room_params
        params.require(:room).permit(:name,:privacy,:group_chat)
    end
end
