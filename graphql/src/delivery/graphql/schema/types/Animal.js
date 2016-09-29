/* @flow */
import {GraphQLObjectType, GraphQLString} from "graphql";
import {DateType, AnimalIdType, LitterIdType, PhotoIdType, UserIdType} from "../types";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField} from "graphql-relay/lib/node/node";

export const AnimalType = new GraphQLObjectType({
    name: "Animal",
    description: "A animal.",
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Animal'),
        owner: {type: UserIdType},
        profilePhoto: {type: PhotoIdType},
        litter: {type: LitterIdType},
        fullName: {type: GraphQLString},
        nickName: {type: GraphQLString},
        birthDate: {type: DateType}
    })
});

