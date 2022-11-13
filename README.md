# Workshop 3 - Create an API (ExpressJS)

## 🌟 Goal

> Build a REST API with ExpressJS

## 👷 Prerequisites

1. Fork this repository then clone it on your computer
2. install Insomnia (or your API Testing tool of choice)
3. Paste your .env file from workshop2 containing credentials to your Mongo Database

## 🗒 What to do

> ⚠ Commit your changes after **each** instruction, following the commit message format:
> ```text
> feat(1): Initiate NPM Project
> ```

1. In this directory, initiate an NPM project
   > ```shell
   > npm init
   > ```
2. Install existing packages with `npm install`
   > ```shell
   >  npm install
   > ```
3. Add NPM packages `express`
   > Mongoose is a package making mongo request easier and more secure
   > ```shell
   > npm install --save express
   > ```
4. Put your database credentials in a file named `.env` (from Workshop2)
5. Take a look at the architecture 
   > One Folder per entity.
   > In each folder, 3 files:
   > 
   > entity.controller.js -> Presentation Layer, API
   > 
   > entity.service.js -> Business Logic Layer
   > 
   > entity.model.js -> Database Layer
6. Implement a "Hello World" route, on GET / that returns "Hello World"
   1. Visit the route at http://localhost:3000/
7. Create the API CRUD for Location
   1. Create routes at Presentation Layer
   2. Implement business logic in the Location Service
   > ```
   > For reference, CRUD:
   > Create: /locations
   > Update: /locations/:id
   > Request (Get All: /locations , Get One: /locations/:id)
   > Delete: /locations/:id
   > ```
