class CreateMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :messages do |t|
       t.text :content
      t.references :room, null: false, foreign_key: true
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
