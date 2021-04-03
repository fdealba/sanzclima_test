require 'rails_helper'

describe 'Requests API', type: :request do
  describe 'GET /requests/history' do
    before do
      FactoryBot.create(:request, input: "{ 'hello': 'test', 'num': 10 }", output: 10)
      FactoryBot.create(:request, input: "{ 'hello': 1, 'num': 20 }", output: 21)
      FactoryBot.create(:request, input: "{ 'hello': 1, 'num': 2 }", output: 3)
    end

    it 'returns success status on requests/history endpoint with all requests' do
      get '/api/v1/requests/history'
  
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end
  describe 'POST /requests/new' do

    it 'requests/new creates a new request successfully' do
      expect {
        post '/api/v1/requests/new', params: { number: 1, a: 10 }
      }.to change { Request.count }.from(0).to(1)

      expect(response).to have_http_status(:created)
    end

    it 'correctly computes the output' do
      10.times do
        number1 = rand(10)
        number2 = rand(20)
        post '/api/v1/requests/new', params: { number1: number1, number2: number2, random: "asd", rand: "['asd, 20', 20, true, {}]", x: true }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response["output"]).to eq(number1 + number2)
      end
    end

    it 'returns a validation error if request params is empty' do
      expect {
        post '/api/v1/requests/new'
      }.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: Output can't be blank, Output is not a number")
    end
  end
end