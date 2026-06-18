class CreateRooms < ActiveRecord::Migration[8.1]
  def change
    create_table :rooms do |t|
      t.string :name
      t.boolean :group_chat, default: false
      t.timestamps
    end
  end
end
