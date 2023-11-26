# Authentication_postgre

Download or clone the repository

cd frontend -> npm install -> npm start

cd backend -> npm install -> nodemon

## Database name authentication then tables inside it are following

set your postgre with table users and 'user_roles'

## users table with following column should be in the same sequence
email(text),  password(text) , id (serial)

## user_role table with following column should be in the same squence
email(text), role(text), password(text)

### DATABASE = authentication ,
### DATABASE_HOST = localhost ,
### DATABASE_USER = postgres ,
### DATABASE_PASS = ***your password*** ,
### PORT = 5000 ,
### JWT_SECRET_KEY = ***Any Secret Key*** ,
### EXPIRES_IN = 2d ,
