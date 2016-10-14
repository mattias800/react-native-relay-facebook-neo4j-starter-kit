import {fromGlobalId} from "graphql-relay";

const graphQlTypes = {}; // GraphQL type
const entityClasses = {}; // Entity type
const getItemMethods = {}; // Fetcher override (if not specified, it uses getAnyById()

export function registerTypeInNodeInterface(graphQlType, entityClass, getItemMethods: Function) {
    graphQlTypes[graphQlType.name] = graphQlType;
    entityClasses[graphQlType.name] = entityClass;
    getItemMethods[graphQlType] = getItemMethods;
    return graphQlType;
}

export async function idFetcher(globalId, info) {
    const {type, id} = fromGlobalId(globalId);
    const getItemOverride = getItemMethods[type];
    return await getItemOverride(id, info);
}

/**
 * Takes an object, returns the GraphQL type for it.
 * @param obj
 * @returns {*}
 */
export function typeResolver(obj) {
    let typeNames = Object.keys(entityClasses);
    for (let i = 0; i < typeNames.length; i++) {
        const typeName = typeNames[i];
        if (obj instanceof entityClasses[typeName]) {
            return graphQlTypes[typeName];
        }
    }
    return null;
}