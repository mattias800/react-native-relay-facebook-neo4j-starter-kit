import {GraphQLSchema, GraphQLObjectType} from "graphql";
import {QueryViewerType} from "./QueryViewerType";
import {MutationViewerType} from "./MutationViewerType";
import {GraphQLString} from "graphql";
import {getUserByAuthToken} from "./persistence/service/UserService";

const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root query",

    fields: () => ({
        viewer: {
            type: QueryViewerType,
            args: {token: {type: GraphQLString}},
            resolve: async(root, {token}) => {
                var actor = await getUserByAuthToken(token);
                if (!actor) {
                    throw "Unauthorized access.";
                } else {
                    return createViewer(actor, token);
                }
            }
        }
    })
});

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation",

    fields: () => ({
        viewer: {
            type: MutationViewerType,
            args: {token: {type: GraphQLString}},
            resolve: async(root, {token}) => {
                var actor = await getUserByAuthToken(token);
                if (!actor) {
                    throw "Unauthorized access.";
                } else {
                    return createViewer(actor, token);
                }
            }
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

function createViewer(actor, token) {
    return new Promise((resolve, reject) => {
        resolve({
            actor,
            token
        })
    });
}