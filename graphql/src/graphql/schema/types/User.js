// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {PhotoIdType, UserIdType, EmailType} from "../types";
import {AuthenticatedDeviceType} from "../all";
import {AnimalType} from "./Animal";
import {LitterType} from "./Litter";
import {KennelType} from "./Kennel";
import {getUserById} from "../../service/UserService";
import {getAnimalOwnedByUserById} from "../../service/AnimalService";
import {getKennelsOwnedByUserById} from "../../service/KennelService";
import {getLittersOwnedByUserById} from "../../service/LitterService";

export const UserType = new GraphQLObjectType({
    name: "User",
    description: "A user.",

    fields: () => ({
        id: {type: UserIdType},
        email: {type: EmailType},
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        friends: {
            type: new GraphQLList(UserType),
            resolve: (user) => user.friends.map(getUserById)
        },
        authenticatedDevices: {
            type: new GraphQLList(AuthenticatedDeviceType)
        },
        profilePhoto: {
            type: PhotoIdType,
            resolve: (user) => user.profilePhoto
        },
        backgroundPhoto: {
            type: PhotoIdType,
            resolve: (user) => user.backgroundPhoto
        },
        animals: {
            type: new GraphQLList(AnimalType),
            resolve: (user) => getAnimalOwnedByUserById(user.id)
        },
        kennels: {
            type: new GraphQLList(KennelType),
            resolve: (user) => getKennelsOwnedByUserById(user.id)
        },
        litters: {
            type: new GraphQLList(LitterType),
            resolve: (user) => getLittersOwnedByUserById(user.id)
        }
    })
});

