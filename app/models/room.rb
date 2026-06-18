class Room < ApplicationRecord
    has_many :room_users, class_name: "RoomUser", foreign_key: "room_id", dependent: :destroy
    has_many :users, through: :room_users
    has_many :messages, dependent: :destroy
    accepts_nested_attributes_for :users
end
