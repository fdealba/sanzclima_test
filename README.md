# Sanz Clima test

Running this project in localhost:

1. Clone the repo using `git clone`

``` console
git clone https://github.com/fdealba/sanzclima_test.git
```

2. DB setup

``` console
rails db:create db:migrate
```

3. Install dependencies

``` console
bundle && yarn
```

4. Running the App:

Build backend:
``` console
rails s
```

Build frontend in a separated terminal:
``` console
./bin/webpack-dev-server
```

For running tests:

1. Frontend

``` console
yarn test
```

2. Backend

``` console
rspec
```
