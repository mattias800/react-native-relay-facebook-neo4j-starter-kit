/* @flow */
import express from "express";
import bodyParser from "body-parser";
import graphQLHTTP from "express-graphql";
import schema from "./schema";
import {authenticateOrCreateUserByPayload} from "./services/AuthenticationService";
import updateSchema from "./util/updateSchema";
import {validateToken} from "./services/Authenticator";
import * as HttpCodes from "./delivery/http/HttpCodes";
const colors = require('colors/safe');
const serverPort = 5000;

const DEBUG = true;
const DEBUG_USER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODRlZjU3NmEtY2Q5ZC00ZjViLTg0ZDktYjEyNWQ3YzJkZWI0IiwiaWF0IjoxNDc0NDkwNDI4fQ.vyVXAv1UKwdCxgrhO5LYIktP_qdgZPqaFNioyfatN18";

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
            res.send({
                         user,
                         isCompleteProfile: user.isCompleteProfile()
                     });
        } catch (e) {
            console.log("Error!");

            console.log(e);
            res.send("Error!");
        }


    });

    app.use(graphQLHTTP(async(req, res) => {
        console.log("--- Request --- " + req.path);
        console.log(colors.magenta(req.body.query || "No query."));
        console.log(colors.yellow(JSON.stringify(req.body.variables) || "No variables"));

        let {authentication} = req.headers;

        if (!authentication && DEBUG) {
            authentication = DEBUG_USER_TOKEN;
        }

        let actor;

        try {
            actor = await validateToken(authentication);
            console.log("Actor");
            console.log(actor);

        } catch (e) {
            res.status(HttpCodes.UNAUTHORIZED).send('Valid authorization token missing.');
            return;
        }

        return {
            schema,
            graphiql: true,
            context: {
                actor
            }
        };
    }));

    app.listen(serverPort);
}

