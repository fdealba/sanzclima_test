class Api::V1::RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @request = Request.new(input: request_params, output: determine_output(request_params))
    if @request.save!
      render json: { output: @request.output }.to_json
    else
      render json: @request.errors
    end
  end

  def index
    @requests = Request.all
    render json: @requests.to_json
  end

  def request_params
    params.select { |param| !["format", "controller", "action", "request"].include? param }.permit!
  end

  def determine_output(input)
    numbers = input.values.select {|value| value.is_a? Integer }
    numbers.reduce(:+)
  end
end