class CreateRoomUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :room_users do |t|
      t.references :room, null: false, foreign_key: true
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
