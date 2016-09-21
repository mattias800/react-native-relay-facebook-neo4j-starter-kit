// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserIdType, EmailType, AuthTokenType} from "../types";
import {AnimalType} from "./Animal";
import {getUserById} from "../../../../persistence/service/UserService";
import {getAnimalOwnedByUserById} from "../../../../persistence/service/AnimalService";

export const UserType = new GraphQLObjectType({
    name: "User",
    description: "A user.",

    fields: () => ({
        uuid: {
            type: UserIdType
        },
        token: {
            type: AuthTokenType
        },
        email: {
            type: EmailType
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        profilePhotoUrl: {
            type: GraphQLString
        },
        animals: {
            type: new GraphQLList(AnimalType),
            resolve: (user) => getAnimalOwnedByUserById(user.id)
        }
    })
});

