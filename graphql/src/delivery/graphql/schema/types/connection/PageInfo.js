import {GraphQLObjectType, GraphQLNonNull, GraphQLBoolean} from "graphql";

export const PageInfo = new GraphQLObjectType({
    name: 'PageInfo',
    fields: {
        hasNextPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        hasPreviousPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
    },
});

