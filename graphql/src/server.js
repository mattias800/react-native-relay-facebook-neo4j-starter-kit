import express from "express";
import jwt from 'express-jwt';
import graphQLHTTP from "express-graphql";
import schema from "./schema";
import {authenticateOrCreateUser} from "./delivery/webservice/authenticate/Authenticate";
import {getJwtSecret} from "./config/JwtConfig";

const serverPort = 5000;

console.log("Lets cypher");

const token = "EAAFEfLDlRZBcBAOq08fFrTBXzC7mV0YGIZAnzvGiDL8DuYKnl9VNYZCFUxYEsnMiutQxVDzmEAA1eZAprfkdQ3CUTZBgmSVXDUTumZB9EF75W2DDSbZCAVIRgAUJH5WxslSt57VcKF0xUblurQZA6qOZARBVZBEZA1xakxdYyqtAyZCiqLP3gOix0KRIg0lXvuuGS7FOE4hA2mbyeYxnILgJT1IbPB4nyEfzH6IZD";

authenticateOrCreateUser("facebook", token)
    .then(user => {
        console.log("User fetched");
        console.log(user);
    })
    .catch(e => {
        console.log("User fetch failed");
        console.log(e);

    });

console.log(`Starting server on port ${serverPort}.`);

const app = express();

app.use(jwt({
    secret: getJwtSecret(),
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization) {
            return req.headers.authorization;
        } else if (req.query && req.query.authorization) {
            return req.query.authorization;
        }
        return null;
    }
}).unless({path: ['/authenticate', "/graphql", "/graphiql"]}));

app.get('/', function (req, res) {
    console.log("--------- req.user");
    console.log(req.user);

    res.send('hello world');
});

app.get('/authenticate', function (req, res) {
    res.send('hello world authenticate');
});

app.use(graphQLHTTP({
    schema,
    graphiql: true,
    // Remove context
    context: {
        user: {
            uuid: '09d58bc8-7cda-4fb6-a509-ba514b54f76d',
            iat: 1473881957
        }
    }
}));

app.listen(serverPort);
