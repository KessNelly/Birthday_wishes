-- create database called birthmark
CREATE DATABASE birthmark WITH OWNER dev;

-- connect to created database
\c birthmark;

-- create schema called celebration
CREATE SCHEMA IF NOT EXISTS celebration AUTHORIZATION dev;

-- create user table
CREATE TABLE IF NOT EXISTS celebration.user(
    id SERIAL,
    phone_number PRIMARY KEY varchar(32) NOT NULL UNIQUE,
    password varchar(32) NOT NULL,
    api_key varchar(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create birthday celebrants' table
CREATE TABLE IF NOT EXISTS celebration.celebrants(
    id SERIAL PRIMARY KEY,
    username varchar(32) NOT NULL UNIQUE,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    phone_number varchar(32) NOT NULL,
    email varchar(32) NOT NULL,
    birthdate DATE NOT NULL,
    channel_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create channels table
CREATE TABLE IF NOT EXISTS celebration.channels(
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL
);

-- create a table for birthday wishes
CREATE TABLE IF NOT EXISTS celebration.birthday_wishes(
    id SERIAL PRIMARY KEY,
    celebrant_id INTEGER NOT NULL,
    message VARCHAR(3500) NOT NULL,
    scheduled_time TIMESTAMP NOT NULL
);
