var neo4j = require('neo4j');
//var db = new neo4j.GraphDatabase('http://username:password@localhost:7474');
import Rx, {Observable} from "rx";

const dbUrl = "http://localhost:7474";
console.log(`Connecting to Neo4j at ${dbUrl}`);

var db = new neo4j.GraphDatabase(dbUrl);

export const cypher = (query, params) => {
    return new Promise((resolve, reject) => {
        let start = new Date();
        db.cypher({query, params},
            (err, results) => {
                let end = new Date();
                console.log(`Query: (${end.getTime() - start.getTime()}ms) ${query} ${JSON.stringify(params) || ""}`);
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
    });
};

export const matchById = (label, id) => {
    return new Promise((resolve, reject) => {
        let start = new Date();
        let query = "MATCH (node:User) WHERE id(node) = {id} return node";
        let params = {id};
        db.cypher({query, params},
            (err, results) => {
                let end = new Date();
                console.log(`Query: (${end.getTime() - start.getTime()}ms) ${query} ${JSON.stringify(params) || ""}`);
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
    });
};
