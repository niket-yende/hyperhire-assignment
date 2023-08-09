# Hyperhire assignment on blockchain

## Description
This project helps us to interact with blockchain using ethers.js & ccxt library

## Installation

```bash
$ npm i
```

## Running the app

```bash
$ npm start
```

## Swagger
[Api-docs](http://localhost:3000/api-docs) - pass the infura api-key for getting the latest transactions.

# Assignment details

# Make API server using two libraries.

## 1. ethers.js

1. returning boolean of wallet address is valid.
2. creating wallet
3. Get latest 1000 transaction of etherium, return the result sorted by etherium quantity.
datas
- Transaction hash
- sender address
- receiver address
- amount of ether transferred
- block number

## 2.  ccxt

1. get the list of coin which is tradable on Binance.
2. Get the list of each coin’s average price(**Average price of 100 recent transactions)**
    
    

## Code rules

1. Should follow the folder structure of (controller, service, entity)
    1. “controller” is for the req, res
    2. “service” is for the business logic
    3. “repository” is for only sql or query stuffs (should not have business logic) o
    4. “entity” is for the database modeling
2. use eslint with airbnb style
3. make all the api’s docs
