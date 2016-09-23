import express from "express";
import bodyParser from "body-parser";
import graphQLHTTP from "express-graphql";
import schema from "./schema";
import {authenticateOrCreateUserByPayload} from "./services/AuthenticationService";
import updateSchema from "./util/updateSchema";

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
            console.log(e);
            res.send("Error!");
        }


    });

    app.use(graphQLHTTP({
        schema,
        graphiql: true
    }));

    app.listen(serverPort);
}
