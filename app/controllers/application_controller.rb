class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  skip_forgery_protection with: :exception

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes
  
  def server_error(exception)
  logger.error "#{exception.message}\n#{exception.backtrace.join("\n ")}"
  end

  before_action :check_authentication

  def check_authentication
    if session[:user_id]
      @current_user = User.find_by(id:session[:user_id])
    else
      render json:{"error": "Session expired. Please sign in again."}, status: :unauthorized
    end 
  end 



end
