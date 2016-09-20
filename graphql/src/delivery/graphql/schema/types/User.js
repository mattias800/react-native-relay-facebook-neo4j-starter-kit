// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserIdType, EmailType} from "../types";
import {AnimalType} from "./Animal";
import {getUserById} from "../../../../persistence/service/UserService";
import {getAnimalOwnedByUserById} from "../../../../persistence/service/AnimalService";

export const UserType = new GraphQLObjectType({
    name: "User",
    description: "A user.",

    fields: () => ({
        uuid: {
            type: UserIdType,
            resolve: (user) => user.properties.uuid,
        },
        token: {
            type: UserIdType,
            resolve: (user) => user.properties.token,
        },
        email: {
            type: EmailType,
            resolve: (user) => user.properties.email
        },
        firstName: {
            type: GraphQLString,
            resolve: (user) => user.properties.firstName
        },
        lastName: {
            type: GraphQLString,
            resolve: (user) => user.properties.lastName
        },
        animals: {
            type: new GraphQLList(AnimalType),
            resolve: (user) => getAnimalOwnedByUserById(user.id)
        }
    })
});

