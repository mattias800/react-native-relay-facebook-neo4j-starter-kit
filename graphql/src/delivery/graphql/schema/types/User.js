// @flow
import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull} from "graphql";
import {UserIdType, EmailType, AuthTokenType} from "../types";
import {AnimalType} from "./Animal";
import {getAnimalOwnedByUserById} from "../../../../persistence/service/AnimalService";
import {User} from "../../../../models/User";

export const UserType = new GraphQLObjectType({
    name: "User",
    description: "A user.",

    fields: () => ({
        id: {type: UserIdType},
        token: {type: AuthTokenType},
        email: {type: EmailType},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        profilePhotoUrl: {type: GraphQLString},
        animals: {
            type: new GraphQLList(AnimalType),
            resolve: (user) => getAnimalOwnedByUserById(user.id)
        }
    })
});

export const UserMutationInputType = new GraphQLInputObjectType({
    name: "UserMutationInputType",
    fields: () => ({
        clientMutationId: {type: GraphQLString},
        token: {type: AuthTokenType},
        email: {type: EmailType},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        profilePhotoUrl: {type: GraphQLString}
    })
});

export const UserMutationPayload = new GraphQLObjectType({
    name: "UserMutationPayload",
    fields: () => ({
        clientMutationId: {type: GraphQLString},
        user: {type: UserType}
    })
});

export const UserMutationType = new GraphQLObjectType({
    name: "UserMutation",
    description: "A user mutation",
    fields: () => ({
        update: {
            type: UserMutationPayload,
            args: {input: {type: UserMutationInputType}},
            resolve: async({viewer, user}, {input}) => {
                input.token !== undefined && (user.token = input.token);
                input.email !== undefined && (user.email = input.email);
                input.firstName !== undefined && (user.firstName = input.firstName);
                input.lastName !== undefined && (user.lastName = input.lastName);
                input.profilePhotoUrl !== undefined && (user.profilePhotoUrl = input.profilePhotoUrl);
                const updatedUser = await User.updateUser(viewer, user);
                return {
                    clientMutationId: input.clientMutationId,
                    user: updatedUser
                }
            }
        }
    })
});

