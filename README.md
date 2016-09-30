# react-native-relay-facebook-neo4j-starter-kit

This is a starter kit that shows how a couple of frameworks can run together.

The main showcase here is GraphQL and Relay. There is no Redux.

The only state that is stored outside of Relay is a session object which contains a user object with an auth token. 
It is stored manually in AsyncStorage.

The only communication that is not over GraphQL is authentication, which is a normal REST endpoint.

#### iOS only, Android possible but not implemented

This was developed on iOS. 

All frameworks used support Android, so if anyone wants to make it work on Android, feel free to make a pull request.

### App
* React Native
* Relay (`react-relay`, `babel-relay-plugin`)
* `react-native-navigation`
* Integration with Facebook (`react-native-fbsdk`)
* Integration with Account Kit (`react-native-facebook-account-kit`)
* `react-native-elements`
* Animations (`react-motion`)

### Backend
* Node (`nodemon`, `babel-node`)
* Express (`express`)
* JWT (`express-jwt`)
* GraphQL (`graphql`, `express-graphql`, `graphql-relay`)
* Neo4j (`neo4j`)
* Flowtype

## What it shows

It demonstrates a couple of things.

* How backend can communicate with Facebook
* How the app can communicate with Facebook
* How Node can communicate with Neo4j
* How to use JWT (JSON Web Tokens) for authentication
* How to implement a GraphQL backend with Node
* How to use Relay with React Native
* How to use react-native-navigation with Relay
* How to send props down to component through Relay.renderer
* How to use Relay `@plural` annotation
* How to implement node interface (not NodeJS) in GraphQL schema for Relay compatibility
* Hot to do mutations with Relay, and making a GraphQL schema that complies with Relay requirements for mutations
* How to do per request authentication in GraphQL requests
* How to generate GraphQL schema and include it in Babel when compiling the app
* How to use Account Kit with React Native
* How to do animations with `react-motion` (but there are of course other options as well)
* How to use Flowtype to add typing to Javascript

## The app

The app allows you to login using Facebook or Account Kit.
After authentication with Facebook, the users token is sent to backend which
validates the user.
It does this by checking if user has been validated with that token before.
If not, it fetches the profile from Facebook and checks if there is a user with that email.
If not, a new user is created.
The resulting user is returned.

If the user logs in with phone number or e-mail (using Account Kit), then the user is taken to a registration
screen where the user has to enter first name, last name and e-mail.

The app then shows two views. The users profile, and a list of all users.
You can press these users to open up their profile.

For current user, a logout button is shown on the profile page.

## GraphQL authentication

Login is done through a normal REST endpoint (but could be moved to a GraphQL mutation),
but all other communications is done over GraphQL and needs authentication.

GraphQL queries are structured as following.

```
{
    viewer(token:"tokenProvidedByBackend") {
        actor {
            firstName,
            lastName,
            email
        }
    }
}
```

All fragments under viewer needs a correct token to be provided.

#### With one exception, the node interface

The node interface is a part of the GraphQL schema that can fetch any object, of any type.
This is needed by Relay.

```
{
    node(id: ".....") {
        id,
        ... on User {
            firstName,
            lastName
        }
    }
}
```

The node interface does not require authentication, by specification.

Authentication could be handled by moving it to request parameters instead, but this has not been done.

## Graphiql

When starting backend, Graphiql is included.

Open `http://localhost:5000/graphiql` in a browser and you can start writing queries immediately.

You will need a token though, which is provided by backend when logging in with the app.

Easiest way to get it is to open the app, log in, and then open `http://localhost:7474/browser/`.
In the database you can enter `match (u:User) return u.token` to get the token.


## Disclaimer

I am not proposing that this is the correct, best, or even good way to do this.

I just wanted to show one way of doing it.

There might be bugs, there might be stuff that is not used.

Use it, improve it, send pull requests if you want.

## Usage ##

### 1. Start database

```
$ cd graphql/docker/neo4j
$ mkdir data
$ docker-compose up
```

### 2. Start backend

```
$ cd graphql
$ npm install
$ npm start
```
### 3. Start app packager

First, install React Native according to their instructions.
This includes `brew install watchman`.

Then:
```
$ cd app
$ npm install
$ npm start
```

### 4. Configure app

#### Setup Facebook SDK

Download FacebookSDK for iOS and put in `~/Documents/FacebookSDK`.
For more info, see https://github.com/facebook/react-native-fbsdk

#### Setup Facebook app id and app name

Setup Facebook app id and app name according to Facebooks documentation.
This is done in the info.plist file.
The current config is for my test app, which you don't have access to, so login will fail.

#### Setup Account Kit

Set app id for AK in info.plist as well.
See documentation here: https://github.com/underscopeio/react-native-facebook-account-kit

### 5. Start app

Open project in Xcode and run.
Or
```
$ cd app
$ react-native run-ios
```
