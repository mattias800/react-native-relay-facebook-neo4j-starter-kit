# react-native-relay-facebook-neo4j-starter-kit

This is a starter kit that shows how a couple of frameworks can run together.

The app allows you to login using Facebook.
After authentication with Facebook, the users token is sent to backend which
validates the user.
It does this by checking if user has been validated with that token before.
If not, it fetches the profile from Facebook and checks if there is a user with that email.
If not, a new user is created.

The app then shows two views. The users profile, and a list of all users.
You can press these users to open up their profile.

For current user, a logout button is shown on the profile page.

### App
React Native
Relay
react-native-navigation
react-native-fbsdk

### Backend
Node
Express
GraphQL
Neo4j

## Usage ##

### 1. Start database

$ cd graphql/docker
$ docker-compose up

### 2. Start backend

$ cd graphql
$ npm install
$ npm start

### 3. Start app packager

$ cd app
$ npm install
$ npm start

### 4. Start app

Open project in Xcode and run.
Or
$ cd app
$ react-native run-ios

