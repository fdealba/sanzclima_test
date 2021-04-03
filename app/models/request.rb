class Request < ApplicationRecord
  validates_presence_of :input
  validates_presence_of :output
  validates :output, numericality: { only_integer: true }
end
