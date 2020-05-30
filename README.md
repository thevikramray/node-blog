# node-blog

## Step to configure locally
1. git clone https://github.com/rayvikram/node-blog.git
2. cd node-blog
3. npm install
4. create .env file 
5. copy content on .envexample to .env
6. .env have 3 variable. adminId and password ( to create post from blog > compose ) and third variable mDB ( it is the credential of free cloud-mongodb https://www.mongodb.com/blog/post/mongodb-42-now-available-on-the-atlas-free-tier ). Yours will be similar to mongodb+srv://name:forProject@cluster.mongodb.net/yourdb?retryWrites=true
7. after configuring .env with mongoDB credential, and adminId, password of your choice.
8. node app.js
9. visit http://localhost:3000/ and you will see your blog live.


# Has a Procfile so that It can upload it to heroku easily.

As you can see this is a simple and basic blog that i have made as a assignment during my Web-Dev course in Udemy. 
I have used HTML CSS with NodeJS MongoDB to complete this project. I have used various NPM packages like EJS for templating, 
ExpressJS for server , Mongoose for simplifying MongoDB , body-parser, etc.

