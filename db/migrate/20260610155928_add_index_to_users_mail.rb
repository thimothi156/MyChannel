class AddIndexToUsersMail < ActiveRecord::Migration[8.1]
  def change
    add_index :users, :email, unique: true
    #Ex:- add_index("admin_users", "username")
  end
end
