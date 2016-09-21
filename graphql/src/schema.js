import {GraphQLSchema, GraphQLObjectType} from "graphql";
import {ViewerType} from "./delivery/graphql/schema/types/Viewer";
import {GraphQLString} from "graphql";
import {getUserByAuthToken} from "./persistence/service/UserService";

const QueryType = new GraphQLObjectType({
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
        }
    })
});

export default new GraphQLSchema({
    query: QueryType
});

function createViewer(actor, token) {
    return new Promise((resolve, reject) => {
        resolve({
            actor,
            token
        })
    });
}