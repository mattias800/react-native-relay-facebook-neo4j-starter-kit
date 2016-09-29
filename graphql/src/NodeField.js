import {nodeDefinitions} from "graphql-relay";
import {idFetcher, typeResolver} from "./type-registry/registry";

export const {nodeInterface, nodeField} = nodeDefinitions(idFetcher, typeResolver);