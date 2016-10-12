/* @flow */
import {GraphQLSchema, GraphQLObjectType} from "graphql";
import {ViewerType} from "./ViewerType";
import {MutationRoot} from "./MutationRoot";
import {nodeField} from "./NodeField";

const QueryRoot = new GraphQLObjectType({
    name: "Query",
    description: "Root query",

    fields: () => ({
        viewer: {
            type: ViewerType,
            resolve: (root, args) => ({})
        },
        node: nodeField
    })
});

export default new GraphQLSchema({
    query: QueryRoot,
    mutation: MutationRoot
});
