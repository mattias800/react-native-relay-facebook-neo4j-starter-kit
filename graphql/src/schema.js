import {GraphQLSchema, GraphQLObjectType} from "graphql";
import {user, users, viewer} from "./delivery/graphql/queries/UserQueries";

const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root query",

    fields: () => ({
        user,
        users,
        viewer
    })
});

export default new GraphQLSchema({
    query: QueryType
});
