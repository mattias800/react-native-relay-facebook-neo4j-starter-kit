/* @flow */
import {GraphQLObjectType, GraphQLFloat} from "graphql";

export const CoordinatesType = new GraphQLObjectType({
    name: "Coordinates",
    description: "Coordinates",

    fields: () => ({
        long: {type: GraphQLFloat},
        lat: {type: GraphQLFloat}
    })

});

