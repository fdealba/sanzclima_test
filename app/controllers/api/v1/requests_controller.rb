class Api::V1::RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    request = Request.new(input: request_params)
    request.output = determine_output(request_params);
    if request.save!
      render json: request, status: :created
    else
      render json: request.errors, status: :unprocessable_entity
    end
  end

  def index
    requests = Request.all.order(created_at: :desc)
    render json: requests
  end

  private

  def request_params
    params.select { |param| !["format", "controller", "action", "request"].include? param }.permit!
  end

  def determine_output(input)
    numbers = input.values.map { |value| value.to_i }
    numbers.reduce(:+)
  end
end