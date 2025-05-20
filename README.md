Prerequisites:

Make sure you have the following installed:

  Node.js (v14 or higher recommended)
    
  MongoDB (running locally or MongoDB Atlas)
    
  Git

Steps:

1. Clone the Repository

   git clone https://github.com/your-username/your-nodejs-project.git

2. Install dependencies

   npm install

3. Set Up Environment Variables
  For Example
   
  PORT=5000                                                //Port number where server will run
  MONGO_URL="mongodb://127.0.0.1:27017/billeasy"          //Mongodb connection string
  JWT_SECRET="1basqgfgdfgdhgfdh"                          //Secret key for jwt

4. Start MongoDB (If using local DB)

5. Run the Application

  npm run dev

6. Import Postman collection from the repo to test APIs, or use browser extensions like Boomerang to test APIs 









Schemas
🔹 User Schema
Represents users of the application.

{
  username: String (required),
  email: String (required, unique),
  password: String (required)
}
username: The display name of the user.

email: Unique identifier used for login.

password: Hashed password (not stored in plain text).

timestamps: Automatically adds createdAt and updatedAt fields.

🔹 Book Schema
Represents books in the system.

{
  title: String (required),
  author: String (required),
  genre: String (required),
  reviews: [Review]
}
title: Title of the book.

author: Author name.

genre: Category or genre of the book.

reviews: Array of embedded review objects.

timestamps: Adds createdAt and updatedAt.

🔹 Review Subdocument Schema
Embedded within the Book schema to represent user reviews.

{
  user: ObjectId (ref to User, required),
  rating: Number (1-5, required),
  comment: String (required)
}
user: Reference to the reviewer (User model).

rating: Number between 1 and 5.

comment: Text feedback from the user.

timestamps: Adds createdAt and updatedAt.



