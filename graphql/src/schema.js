/* @flow */
import {GraphQLSchema, GraphQLObjectType, GraphQLString} from "graphql";
import {ViewerType} from "./ViewerType";
import {MutationRoot} from "./MutationRoot";
import {getUserByAuthToken} from "./persistence/service/UserService";
import {nodeField} from "./NodeField";
import {UserType} from "./delivery/graphql/schema/types/UserType";

const QueryRoot = new GraphQLObjectType({
    name: "Query",
    description: "Root query",

    fields: () => ({
        viewer: {
            type: ViewerType,
            args: {token: {type: GraphQLString}},
            resolve: async(root, {token}) => {
                var actor = await getUserByAuthToken(token);
                if (!actor) {
                    throw "Unauthorized access.";
                } else {
                    return createViewer(actor, token);
                }
            }
        },
        node: nodeField
    })
});

export default new GraphQLSchema({
    query: QueryRoot,
    mutation: MutationRoot
});

function createViewer(actor, token) {
    return new Promise((resolve, reject) => {
        resolve({
            actor,
            token
        })
    });
}