// @flow
import {GraphQLObjectType, GraphQLString} from "graphql";
import {PhotoIdType, UserIdType} from "../../types";

export const PhotoType = new GraphQLObjectType({
    name: "Photo",
    description: "A photo.",

    fields: () => ({
        id: {type: PhotoIdType},
        url: {type: GraphQLString},
        owner: {type: UserIdType}
    })
});
