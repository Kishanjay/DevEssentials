# About
This is a running example of a nodejs and mysql project running in a docker
container.

Since this is about a dev-example, the nodejs app source code will not be 
contained, but shared through a volume for nodemon/node-dev to autorestart 
the application on changes.

The node application is running on port 8090
supported routes are:

- localhost:8090/
- localhost:8090/get
- localhost:8090/insert

The database manager _adminer_ is running on port 8080.

- localhost:8080
 
# Setup
Only the dependencies for the nodejs project need to be downloaded seperately.
Run `npm install` in the app directory.

