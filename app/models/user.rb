class User < ApplicationRecord
  has_many :messages
  has_many :groups, through: :members
  has_many :members
end
