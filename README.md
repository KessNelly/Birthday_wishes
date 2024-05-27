# Project Title
Birthday-Wishes

## Project Description
Birthday wishes is a web service that enables developers send birthday messages to celebrants.

## Technologies
- Node JS 
- Postgres
- Express-validator for validation
- Node-cron for automated background task, checking for dates inwhich birthday wishes are to be sent
- Jest for unit testing
- Passport for authentication

## Prerequisites
- Node Js
- Postgres (psql)
- Node cron

## Install and Run the Repo
- git clone https://github.com/KessNelly/Birthday_wishes.git
- cd Birthday_wishes
- npm install (to install all dependencies)
- npm run start : to start server
- npm run dev : to automatically restart server during development
- npm test : for testing

## Features
- API key : generated for users (developers) who want to send birthday wishes to individuals

- Background Task : Personalized birthday wishes automatically generated and sent to celebrants

## The Process
I started by creating a folder for the project , followed by setting up an express server to handle incoming requests. Then, I installed all the necessary dependencies for my project as well as created my folder structure.

Next, I set up my database using Postgres where the necessary tables were created. 

Subsequently, codes for a new user as well as generation of API key were written with unit testing done as well as testing of the API on Postman.

Then, API endpoints were created for celebrants as well as birthday wishes for each celebrant with concurrent unit testing and testing on Postman.

Automated background check for birthdates approaching each day was also set up using Node cron, to enable wishes to be sent as at when due.

Finally, API documentation was carried out and published.

## Lessons From Development
Building this project was a great learning curve for me as it greatly enhanced my problem solving skills as well as gave me exposure to try out new technologies.

- Database Management
Working with Postgres helped to deepen my understanding on relational database.
- Debugging
Even though debugging is a major reason I love to write codes (because of the joy that comes when the bug is found), this project stretched and improved my capacity to do so.
- Research
I had to do a lot of reading on documentations of some of the technologies stated above, how they work and how to integrate them. Google will always be your friend as a developer.

## Further Improvement
I would continously work on improving the project wtih time

## Contributions
Contributions to make the project better are very much welcome.

## API Documentation
https://documenter.getpostman.com/view/22834357/2sA3JT3y8n

## Contact
Email : ojkessnelly@gmail.com
GitHub : https://github.com/KessNelly
