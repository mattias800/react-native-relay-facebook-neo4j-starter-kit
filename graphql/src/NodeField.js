import {nodeDefinitions} from "graphql-relay";
import {idFetcher, typeResolver} from "./registry";

export const {nodeInterface, nodeField} = nodeDefinitions(idFetcher, typeResolver);