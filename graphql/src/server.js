import express from "express";
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import graphQLHTTP from "express-graphql";
import schema from "./schema";
import {getJwtSecret} from "./config/JwtConfig";
import {authenticateOrCreateUser} from "./services/AuthenticationService";

const serverPort = 5000;

console.log("Lets cypher");

const token = "EAAFEfLDlRZBcBAOq08fFrTBXzC7mV0YGIZAnzvGiDL8DuYKnl9VNYZCFUxYEsnMiutQxVDzmEAA1eZAprfkdQ3CUTZBgmSVXDUTumZB9EF75W2DDSbZCAVIRgAUJH5WxslSt57VcKF0xUblurQZA6qOZARBVZBEZA1xakxdYyqtAyZCiqLP3gOix0KRIg0lXvuuGS7FOE4hA2mbyeYxnILgJT1IbPB4nyEfzH6IZD";

console.log(`Starting server on port ${serverPort}.`);

const app = express();

app.use(bodyParser.json());

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
    res.send('hello world');
});


app.post('/authenticate', async function (req, res) {
    const {service, token} = req.body;
    const user = await authenticateOrCreateUser(service, token);
    res.send(user.properties);
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
