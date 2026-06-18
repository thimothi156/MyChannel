class RoomMessagesController < ApplicationController
    def create
        @room = Room.find(params[:room_id])
        @message = @room.room_messages.build(content: params[:content], user_id: params[:user_id])
        if @message.save
            MessageChannel.broadcast_to(@room.id,{user: @message.user.first_name, content: @message.content})
            redirect_to @room, notice: "Message sent!"
        else
            redirect_to @room, alert: "Failed to send message."
        end
    end
end
