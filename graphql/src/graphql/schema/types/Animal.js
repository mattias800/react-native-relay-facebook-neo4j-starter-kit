/* @flow */
import {GraphQLObjectType, GraphQLString} from "graphql";
import {DateType, AnimalIdType, LitterIdType, PhotoIdType, UserIdType} from "../types";

export const AnimalType = new GraphQLObjectType({
    name: "Animal",
    description: "A animal.",

    fields: () => ({
        id: {type: AnimalIdType},
        type: {type: AnimalType},
        owner: {type: UserIdType},
        profilePhoto: {type: PhotoIdType},
        litter: {type: LitterIdType},
        fullName: {type: GraphQLString},
        nickName: {type: GraphQLString},
        birthDate: {type: DateType}
    })
});

