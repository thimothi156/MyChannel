class Order < ApplicationRecord
     broadcasts_to ->(order) { "orders" }
end
