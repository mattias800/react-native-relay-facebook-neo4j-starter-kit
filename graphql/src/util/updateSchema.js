/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import {graphql} from 'graphql';
import chalk from 'chalk';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import schema from '../schema';

const jsonFile = path.join(__dirname, '../data/schema.json');
const jsonFileForApp = path.join(__dirname, '../../../app/src/data/schema.json');
const graphQLFile = path.join(__dirname, '../data/schema.graphql');
const graphQLFileForApp = path.join(__dirname, '../../../app/src/data/schema.graphql');

async function updateSchema() {
    console.log("Updating schema...");
    try {
        const json = await graphql(schema, introspectionQuery);
        fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
        fs.writeFileSync(jsonFileForApp, JSON.stringify(json, null, 2));
        fs.writeFileSync(graphQLFile, printSchema(schema));
        fs.writeFileSync(graphQLFileForApp, printSchema(schema));
        console.log(chalk.green('Schema has been regenerated'));
    } catch (err) {
        console.error(chalk.red(err.stack));
    }
}

// Run the function directly, if it's called from the command line
if (!module.parent) updateSchema();

export default updateSchema;