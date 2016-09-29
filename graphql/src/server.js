/* @flow */
import express from "express";
import bodyParser from "body-parser";
import graphQLHTTP from "express-graphql";
import schema from "./schema";
import {authenticateOrCreateUserByPayload} from "./services/AuthenticationService";
import updateSchema from "./util/updateSchema";
const colors = require('colors/safe');
const serverPort = 5000;

updateSchema().then(startServer);

function startServer() {
    console.log(`Starting server on port ${serverPort}.`);

    const app = express();

    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.send('hello world');
    });

    app.post('/authenticate', async function (req, res) {
        const {service, payload} = req.body;
        try {
            const user = await authenticateOrCreateUserByPayload(service, payload);
            res.send(user);
        } catch (e) {
            console.log("Error!");

            console.log(e);
            res.send("Error!");
        }


    });

    app.use(graphQLHTTP((req) => {
        console.log("--- Request --- " + req.path);
        console.log(colors.magenta(req.body.query || "No query."));
        console.log(colors.yellow(req.body.variables || "No variables"));

        return {
            schema,
            graphiql: true
        };
    }));

    app.listen(serverPort);
}
