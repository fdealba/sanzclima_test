class CreateRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :requests do |t|
      t.string :input
      t.string :output

      t.timestamps
    end
  end
end
