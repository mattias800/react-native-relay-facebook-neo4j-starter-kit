// @flow
import {GraphQLObjectType, GraphQLString} from "graphql";
import {KennelIdType, PhotoIdType, UserIdType} from "../types";
import {CoordinatesType} from "./Coordinates";

export const KennelType = new GraphQLObjectType({
    name: "Kennel",
    description: "A kennel.",

    fields: () => ({
        id: {type: KennelIdType},
        owner: {type: UserIdType},
        name: {type: GraphQLString},
        profilePhoto: {type: PhotoIdType},
        location: {type: CoordinatesType}
    })
});
