### A Full stack MERN app to track expenses. That is, this is a MERN Expense-Tracker application.

## App Structure

The app is divided into two main parts: a sub-directory named `client` representing reactJs frontend code. Everything else except that folder
pertains to a node/express based backend project. Basically, there is a `server` application and a `client` application.

The data for the app is stored on the cloud using MongoDB Atlas here: https://www.mongodb.com/cloud/atlas. Signing up and utilizing basic tier is free. The credentials for the DB and any collections has to be used during connection in the backend/express app (refer to the `./config/db.js` file for the connection syntax).

## How to run the app

There are 4 scripts to run the two applications: start, server, client and dev. These scripts are discussed below:

1. `start` script: is a node command to run the main nodejs file called server.js. This will start the node/express server in non-monitoring, simple mode.
2. `server` script: runs the main nodejs file called server.js using the `nodemon` package in a auto-reloading, monitoring mode. This will allow us to reload the server (only) when something changes in the server based code. This is the preferred mode of running our server.
3. `client` script: runs the client or React based code that displays a single page with transactions. We utilize the `--prefix` option to `npm start` to specify the client sub-folder within the root folder. Change the prefix path based on your client sub-folder location.
4. `dev` script: utilizes the `concurrently` package to simultaneously run both the `client` and the `server` scripts from above. This is the preferred mode to run during development to allow for debugging as well.

**_## Very important note (related from environment section below)_**
Before starting the server or any script that starts the server as part of it, please create a env/environment file for the `dotenv` package to read values from within the `server.js` file. The way current server.js code is setup the env file has to be named `config.env`. If you use a different file name, change the name in the dotenv.config code block within server.js.

## The environment package and variable gotchas

We utilize the `dotenv` package to enable us to setup and read environment variables from a .env type file. A sample usage of dotenv is:

```
    process.env.NODE_ENV === 'development'
```

which is taken from the server.js file. A <filename>.env file allows us to store environment specific variables like the current environment, DB credentials etc. Note the following code from server.js again which configures a file named `config.env` to be used as the environment variable to be used by the dotenv package:

```
    dotenv.config({
        path: './config/config.env'
    })
```

where this code assumes that the configuration file lies within a folder called <root>/config/. Hence, in order to run the app, please create and fill up a configuration file, in this case named config.env.
