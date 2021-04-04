# README

Running this project in localhost:

1. Clone the repo using `git clone`

``` console
sanzclima_test git:(main): git clone https://github.com/fdealba/sanzclima_test.git
```

2. DB setup

``` console
sanzclima_test git:(main): rails db:create db:migrate
```

3. Install dependencies

``` console
sanzclima_test git:(main): bundle && yarn
```

4. Run on port 3000

``` console
sanzclima_test git:(main): rails s
```


For running tests:

1. Frontend

``` console
sanzclima_test git:(main): yarn test
```

2. Backend

``` console
sanzclima_test git:(main): rspec
```
