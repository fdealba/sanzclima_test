Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      post 'requests/new', to: 'requests#new'
      get 'requests/history', to: 'requests#index'
    end
  end

  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'home#index'
end
