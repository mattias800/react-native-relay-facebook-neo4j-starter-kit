import {nodeDefinitions} from "graphql-relay";
import {fetchByGlobalId, resolveGraphQLTypeForObject} from "./type-registry/registry";

export const {nodeInterface, nodeField} = nodeDefinitions(fetchByGlobalId, resolveGraphQLTypeForObject);