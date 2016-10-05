import {fromGlobalId} from "graphql-relay";
import {getAnyById} from "../persistence/neo4j/Neo4jConnector";

const types = {}; // GraphQL type
const getItemOverrides = {}; // Fetcher override (if not specified, it uses getAnyById()
const typeClasses = {}; // Entity type

export function registerTypeInNodeInterface(type, typeClass, getItemOverride) {
    types[type.name] = type;
    typeClasses[type.name] = typeClass;
    getItemOverrides[type] = getItemOverride;
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

    return item;
}

/**
 * Takes an object, returns the GraphQL type for it.
 * @param obj
 * @returns {*}
 */
export function typeResolver(obj) {
    let typeNames = Object.keys(typeClasses);
    for (let i = 0; i < typeNames.length; i++) {
        const typeName = typeNames[i];
        if (obj instanceof typeClasses[typeName]) {
            return types[typeName];
        }
    }
    return null;
}