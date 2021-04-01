class Api::V1::RequestsController < ApplicationController
  def new
    render json: {
      hello: 'how are you? im New'
    }.to_json
  end

  def index
    render json: {
      hello: 'how are you? im INDEX'
    }.to_json
  end
end