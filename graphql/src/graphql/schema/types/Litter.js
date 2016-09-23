// @flow
import {GraphQLObjectType} from "graphql";
import {DateType, AnimalIdType, KennelIdType, LitterIdType, PhotoIdType, UserIdType} from "../types";

export const LitterType = new GraphQLObjectType({
    name: "Litter",
    description: "A litter.",

    fields: () => ({
        id: {type: LitterIdType},
        owner: {type: UserIdType},
        kennel: {type: KennelIdType},
        father: {type: AnimalIdType},
        mother: {type: AnimalIdType},
        profilePhoto: {type: PhotoIdType},
        conceptionDate: {type: DateType},
        expectedBirthDate: {type: DateType},
        birthStart: {type: DateType},
        birthEnd: {type: DateType}
    })
});

