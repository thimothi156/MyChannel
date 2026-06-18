class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_for params[:room_id]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end