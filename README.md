# Aggregation Test
This node typescript project implements MongoDB aggregation pipeline
 
Since there was a need of sample data - the sample data is created by [making API calls](https://documenter.getpostman.com/view/1522130/RWaHw8gN) to [this project](https://github.com/xameeramir/aggregationTest) created specifically for the aggregation testing.

Following are the steps to populate and/or query the data:

0. The health of the API can be tested with welcome API [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#74eee613-6325-5a29-fc6d-e75ba4618561)
1. The companies are added [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#32777c12-5522-7c52-8bc4-4e3265f21216)
2. The company users are added [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#a89157ce-0efa-c5bf-a9cf-9a4db8fdac7b)
3. The company lessons are added [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#df2e9395-4b89-4e57-f401-00263c6da9a6)
4. The lessons are assigned to users in company [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#671a2bac-f03f-fb90-7163-570a52bee067)
5. The lesson assigned to a user can be started [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#ad0afb14-5ab2-0331-7fe9-0e400ffbdb70)
6. The lesson assigned to a user can be ended [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#87e1dda5-640c-0890-f96e-0e9e13cac4b4)

Or else, please [mongo restore](https://docs.mongodb.com/manual/reference/program/mongorestore) this DB [data](https://github.com/xameeramir/aggregationTest/blob/master/src/models/db/aggregationTest.zip) in your MongoDB instance

The completion, pending and participation percentages can be retrieved with their respective APIs

1. The Pending Percentage API [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#d47100a1-a34e-460e-47f8-903f3172288c)
2. The Participation Percentage API [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#542722e2-1eb1-96e0-863e-e636cb58ea08)
3. The Completion Percentage API [ref.](https://documenter.getpostman.com/view/1522130/RWaHw8gN#e3ac3800-98df-95ba-4a82-0fdf16fccc2c)

Please import the [Postman collection](https://www.getpostman.com/collections/2265cea7293884a4491c) to simulate the APIs on your local by running `npm start` after `npm i`.

Important links:

 - [API document](https://documenter.getpostman.com/view/1522130/RWaHw8gN)
 - [Database dump](https://github.com/xameeramir/aggregationTest/blob/master/src/models/db/aggregationTest.zip)
 - [Postman collection](https://www.getpostman.com/collections/2265cea7293884a4491c)
