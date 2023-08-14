# Digital Cow Hut Admin With Auth

### Technology Stack:

- Used TypeScript as the programming language.
- Used Express.js as the web framework.
- Used Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.
- Used Zod as for the schema validation
- Used JSON Web Token for authentication & authorization

### Live Link: https://digital-cow-hut-woad.vercel.app/

### Application Routes:

#### Admin Routes :

Route: /api/v1/admins/create-admin (POST)

Request body: 
 ```json
 {
  "password":"amiadminbujheshunekothakoiyo",
  "role": "admin",
   "name":{
      "firstName": "Mr. Admin"
      "lastName": "Bhai"
    },
  "phoneNumber":"01711111111",
  "address": "Uganda",
}
```
Response: The newly created admin object.

```json
{
    "success": true, 
    "statusCode":200,
    "message": "Admin created successfully",
    "data":  {
        "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",  
        "role": "admin",
        "name":{
           "firstName": "Mr. Admin"
           "lastName": "Bhai"
         },
          "phoneNumber":"01711111111",
          "address": "Uganda",
         }
     }

```

Route: /api/v1/admins/login (POST)


Request body: 
 ```json
 {
   "phoneNumber":"01711111111",
   "password": "amiadmin",
}
```

 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "User logged in successfully",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```

   #### Auth (User)
   - api/v1/auth/login (POST)
   Request body: 
 ```json
 {
   "phoneNumber":"01711111111",
   "password": "userpassword",
}
```

 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "User logged in successfully",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```
   - api/v1/auth/signup (POST)
   ##### Sample Data: (User as Buyer)

```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",
  "password":"@password",
  "role": "buyer",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":70000,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```

##### Sample Data: (User as Seller)

```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",
  "password":"@password",
  "role": "seller",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":0,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```
   - api/v1/auth/refresh-token (POST)




#### User

- api/v1/users (GET) → Can only be accessed by admin
- api/v1/users/:id (Single GET) → Can only be accessed by admin
- api/v1/users/:id (PATCH) → Can only be accessed by admin
- api/v1/users/:id (DELETE) → Can only be accessed  by admin
- api/v1/users/my-profile (GET) → Can only be accessed by requested access token's specific profile information
- api/v1/users/my-profile (PATCH) →  Can only be accessed by requested access token's specific profile information




 #### Cows
   
   - api/v1/cows (POST) → Can only be accessed by seller
   - api/v1/cows (GET) → Can only be accessed by buyer,seller & admin
   - api/v1/cows/:id (Single GET) → Can only be accessed by buyer,seller & admin


   - api/v1/cows/:id (PATCH) → Can only be accessed by the seller of the cow
   - api/v1/cows/:id (DELETE) → Can only be accessed by the seller of the cow

##### Sample Data: (Cow)

```json
{
  "name": "Raja",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "ObjectId(609c17fc1281bb001f523456)" // seller reference _id
}
```

### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
- api/v1/orders/:id (GET)

##### Sample Data: (Order)

```json
{
  "cow": "ObjectId(“6473c6a50c56d0d40b9bb6a3)", // cow reference _id
  "buyer": "ObjectId(“6473c6a50c56d0d40b9bb6a3)" // user reference  _id
}
```

### Note: 
You need to hit all the routes with an authorization token 

Request header:
```json
{
  "authorization": "accessToken", 
}