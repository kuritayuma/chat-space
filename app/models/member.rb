class Member < ApplicationRecord
  belogs_to :group
  belogs_to :user
end
