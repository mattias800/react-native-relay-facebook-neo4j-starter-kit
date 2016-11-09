import {fromGlobalId} from "graphql-relay";

let graphQlTypes = {}; // GraphQL type
let entityClasses = {}; // Entity type
let getItemMethods = {}; // Fetcher override (if not specified, it uses getAnyById()

export function registerTypeInNodeInterface(graphQlType, entityClass, getItemMethod: Function) {
    console.log("Registering type in Node Interface registry: " + graphQlType.name);

    graphQlTypes[graphQlType.name] = graphQlType;
    entityClasses[graphQlType.name] = entityClass;
    getItemMethods[graphQlType.name] = getItemMethod;
    return graphQlType;
}

export async function fetchByGlobalId(globalId, info) {
    const {type, id} = fromGlobalId(globalId);
    const getItem = getItemMethods[type];
    console.log(getItemMethods);

    if (!getItem) {
        console.error(`Node Interface registry error: No getter for type '${type}'.`);
        throw `Node Interface registry error: No getter for type '${type}'.`;
    }
    if (typeof getItem !== "function") {
        console.error(`Node Interface registry error: Getter for type '${type}'.`);
        throw `Node Interface registry error: Getter for type '${type}'.`;
    }
    console.log("getItem");
    console.log(getItem);

    return await getItem(id, info);
}

export function resolveGraphQLTypeForObject(obj) {
    let typeNames = Object.keys(entityClasses);
    for (let i = 0; i < typeNames.length; i++) {
        const typeName = typeNames[i];
        if (obj instanceof entityClasses[typeName]) {
            return graphQlTypes[typeName];
        }
    }
    return null;
}