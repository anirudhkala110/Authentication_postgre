# Authentication_postgre

Download or clone the repository

cd frontend -> npm install -> npm start

cd backend -> npm install -> nodemon


set your postgre with table users and 'user_roles'

##users table with following column
email(text),  password(text) , id (serial)

##user_role table with following column
email(text), role(text), password(text)

DATABASE = authentication ,
DATABASE_HOST = localhost ,
DATABASE_USER = postgres ,
DATABASE_PASS = ***your password*** ,
PORT = 5000 ,
JWT_SECRET_KEY = ***Any Secret Key*** ,
EXPIRES_IN = 2d ,
