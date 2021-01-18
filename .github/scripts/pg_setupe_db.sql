-- Create database and user

CREATE USER webuser WITH PASSWORD 'test_db_password';

CREATE DATABASE web WITH OWNER = webuser;

