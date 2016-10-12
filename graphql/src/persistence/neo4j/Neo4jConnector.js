var colors = require('colors/safe');
var neo4j = require('neo4j');
//var db = new neo4j.GraphDatabase('http://username:password@localhost:7474');

const dbUrl = "http://localhost:7474";
console.log(`Connecting to Neo4j at ${dbUrl}`);

var db = new neo4j.GraphDatabase(dbUrl);

export const cypher = (query, params) => {
    return new Promise((resolve, reject) => {
        let start = new Date();

        db.cypher({query, params},
                  (err, results) => {
                      let end = new Date();
                      logQuery(start, end, query, params);
                      if (err) {
                          console.warn("Query error.");
                          console.warn(err);
                          reject(err);
                      } else {
                          logQueryResult(results);
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
                      logQuery(start, end, query, params);
                      if (err) {
                          reject(err);
                      } else {
                          resolve(results);
                      }
                  });
    });
};

export const getAnyById = (id) => {
    return new Promise((resolve, reject) => {
        let start = new Date();
        let query = "MATCH (node {uuid:{id}) WHERE id(node) = {id} return node";
        let params = {id};
        db.cypher({query, params},
                  (err, results) => {
                      let end = new Date();
                      logQuery(start, end, query, params);
                      if (err) {
                          reject(err);
                      } else {
                          resolve({...results.properties});
                      }
                  });
    });
};

function logQuery(start, end, query, params) {
    console.log(
        `--- DB-query ${end.getTime() - start.getTime()}ms
${colors.blue(reformatQuery(query))}
${colors.yellow(JSON.stringify(params) || "")}`
    );
}

function logQueryResult(results) {
    console.log(colors.cyan(JSON.stringify(results)));
}

function reformatQuery(query) {
    return query.split("\n")
                .map(row => row.trim())
                .filter(row => row.length > 0)
                .join("\n");
}