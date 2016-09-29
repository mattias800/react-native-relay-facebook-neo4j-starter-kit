import {fromGlobalId} from 'graphql-relay';
import {getAnyById} from "./persistence/neo4j/Neo4jConnector";

const types = {};
const getItemOverrides = {};

export function registerType(type, getItemOverride) {
    types[type.name] = type;
    getItemOverrides[type] = getItemOverride;

    // Allow e.g. `export default registerType(MyType);`.
    return type;
}

export async function idFetcher(globalId, info) {
    const {type, id} = fromGlobalId(globalId);

    const getItemOverride = getItemOverrides[type];
    let item;
    if (getItemOverride) {
        item = await getItemOverride(id, info);
    } else {
        item = await getAnyById(id);
    }

    return {type, ...item};
}

export function typeResolver(obj) {
    return types[obj.type];
}