class User < ApplicationRecord
    has_many :room_users, class_name: "RoomUser", foreign_key: "user_id", dependent: :destroy
    has_many :rooms, through: :room_users
end
