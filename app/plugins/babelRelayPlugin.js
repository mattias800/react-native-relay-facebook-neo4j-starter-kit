var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../src/data/schema.json');

console.log("Compiling GraphQL schema with Babel.");

module.exports = getbabelRelayPlugin(schema.data);