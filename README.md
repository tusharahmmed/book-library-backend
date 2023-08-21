# Digital Book Store With Auth

### Technology Stack:

- Used TypeScript as the programming language.
- Used Express.js as the web framework.
- Used Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.
- Used Zod as for the schema validation
- Used JSON Web Token for authentication & authorization

### Live Link: https://book-store-backend-sage.vercel.app/

### Frontend: https://digital-books-store.netlify.app/

### Application Routes:

#### User

- api/v1/auth/login (POST)
- api/v1/auth/signup (POST)
- api/v1/auth/ (GET)
- api/v1/auth/logout (POST)

#### Auth (User)

- api/v1/auth/login (POST)
  Request body:

```json
{
  "email": "example@gmail.com",
  "password": "password@@"
}
```

Response Sample Pattern:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMzMwM2FhNDI1OTZlODVlZTk5NjIiLCJlbWFpbCI6InR1c2hhcmVlQGdtYWlsLmNvbSIsImlhdCI6MTY5MjYxMTMzMSwiZXhwIjoxNjkyNjk3NzMxfQ.SgbnKgJygB4x6-r_sc6br506a27FQSPY6br6XAXheaM",
    "user": {
      "email": "user@gmail.com",
      "fullName": "user_name",
      "_id": "64e33303aa42596e85ee9962",
      "createdAt": "2023-08-21T09:48:51.010Z",
      "updatedAt": "2023-08-21T09:48:51.010Z",
      "__v": 0
    }
  }
}
```

- api/v1/auth/signup (POST)

```json
{
  "email": "example@gmail.com",
  "password": "password@@"
  "fullName": "full_name"
}
```

Response Sample Pattern:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMzMwM2FhNDI1OTZlODVlZTk5NjIiLCJlbWFpbCI6InR1c2hhcmVlQGdtYWlsLmNvbSIsImlhdCI6MTY5MjYxMTMzMSwiZXhwIjoxNjkyNjk3NzMxfQ.SgbnKgJygB4x6-r_sc6br506a27FQSPY6br6XAXheaM",
    "user": {
      "email": "user@gmail.com",
      "fullName": "user_name",
      "_id": "64e33303aa42596e85ee9962",
      "createdAt": "2023-08-21T09:48:51.010Z",
      "updatedAt": "2023-08-21T09:48:51.010Z",
      "__v": 0
    }
  }
}
```

- api/v1/auth/refresh-token (POST)
- api/v1/auth/ (GET)
- api/v1/auth/logout (POST)

#### Books

- api/v1/books/add-new (POST)
- api/v1/books (GET)
- api/v1/books/:id (Single GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

##### Sample Data: (Cow)

```json
{
  "title": "TEST 4",
  "author": "test_authro",
  "genres": ["History", "Romance"],
  "publicationYear": "2024",
  "authorId": "ObjectId(609c17fc1281bb001f523456)" // user reference _id
}
```

### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?genres=History
- api/v1/cows?publicationYear=2023
- api/v1/cows?searchTerm=Cha

#### WishList

- api/v1/wish-lists/add-new (POST)

Request body:

```json
{
  "userId": "64db85be15900eab59d3bf19", // user reference _id
  "books": [
    {
      "bookId": "64da6466eabc67877d055555", // book reference _id
      "status": "wishlist"
    }
  ]
}
```

Response Sample Pattern:

```json
{
  "success": true,
  "message": "Wishlist created successfully",
  "data": {
    "userId": "64e33926c3df734ff8edc4e1", // user ref id
    "books": [
      {
        "bookId": "64e338fbcda1eb11263c02b9", // book reffrence id
        "status": "currently reading",
        "_id": "64e33942c3df734ff8edc4ea"
      }
    ],
    "_id": "64e33942c3df734ff8edc4e9"
  }
}
```

- api/v1/wish-lists/userId (GET) - get user wishlist
- api/v1/wish-list/userId (PATCH) - update wishlist status

Request body:

```json
{
  "bookId": "64da6466eabc67877d055555",
  "status": "wishlist",
  "_id": "64dbb0321ce81c70f2c150ee"
}
```

Response Sample Pattern:

```json
{
  "success": true,
  "message": "Wishlist created successfully",
  "data": {
    "userId": "64e33926c3df734ff8edc4e1", // user ref id
    "books": [
      {
        "bookId": "64da6466eabc67877d055555",
        "status": "wishlist",
        "_id": "64dbb0321ce81c70f2c150ee"
      }
    ],
    "_id": "64e33942c3df734ff8edc4e9"
  }
}
```

- api/v1/wish-lists/remove/userId (PATCH) - remove book from wishlist
  Request Body:

```json
{
  "success": true,
  "message": "Wishlist created successfully",
  "data": {
    "userId": "64e33926c3df734ff8edc4e1",
    "books": [
      {
        "bookId": "64e338fbcda1eb11263c02b9",
        "status": "currently reading",
        "_id": "64e33942c3df734ff8edc4ea" // need to pass this id in body
      }
    ],
    "_id": "64e33942c3df734ff8edc4e9"
  }
}
```

As:

```json
{
  "_id": "64dbb0321ce81c70f2c150ee"
}
```

Response Sample Pattern:

```json
{
  "success": true,
  "message": "Successfully removed bOok from wishlist",
  "data": {
    "userId": "64e33926c3df734ff8edc4e1", // user ref id
    "books": [],
    "_id": "64e33942c3df734ff8edc4e9"
  }
}
```

### Note:

You need to hit all the routes with an authorization token

Request header:

```json
{
  "authorization": "accessToken"
}
```
