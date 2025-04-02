---
title: Lendsqr
description: lending app
author: Joshua Eze
created:  2025 Mar 29
updated: 2025 Apr 2
---

Lendsqr
=========

## development
I started with the project structure, and moved the routes into the (pages) folder to allow for a global state provider controlling authentication . To manage authentication I used a stateful data storage system (sessions/cookies), rather than tokens, because the views are being served to the client.

I also used a rendering template to design a frontend for the service, __so all endpoints return a view__.

## How to run the app

Run (npm run start:dev) from the main directory to compile for development. To test run (npm t). 

__Make sure you have MySQL community server/workbench installed, and update the database from the db directory using (npx knex migrate:latest --env testing), to create the testing tables on MySQl local instance__

## The Database and relationships

The knexjs ORM was used to translate queries for MySql(on local machine), and PlanetScale (for production). The migrations created were users, and transfers; which housed the user data, and user transfer data. PlanetScale doesn't allow foreign key constraints, so I improvised, by inserting the user_id into the transfers table, for every user transfer. See E-R diagram below for relationships between the entities.

[![demo credit ER diagram](/demo_credit.drawio.png?raw=true)](#erdiagram)

## Deployment

Heroku was used for deployment (see production URL below), while the cloudinary nodejs sdk was used to upload/download user images, as Heroku doesn't store user generated files.

https://joshua-eze-lendsqr-be-test-d68fed4092b4.herokuapp.com.




