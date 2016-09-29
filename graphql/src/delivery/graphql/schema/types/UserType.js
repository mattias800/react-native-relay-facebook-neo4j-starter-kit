/* @flow */
import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull} from "graphql";
import {UserIdType, EmailType, AuthTokenType} from "../types";
import {User} from "../../../../entities/User";
import {getUserByAuthToken, getUserByUuid} from "../../../../persistence/service/UserService";
import {registerType} from "../../../../registry";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField} from "graphql-relay";

export const UserType = new GraphQLObjectType({
    name: "User",
    description: "A user.",
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('User'),
        token: {type: AuthTokenType},
        email: {type: EmailType},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        profilePhotoUrl: {type: GraphQLString}
    })
});

export const UserMutationInputType = new GraphQLInputObjectType({
    name: "UserMutationInputType",
    fields: () => ({
        clientMutationId: {type: GraphQLString},
        id: {type: UserIdType},
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

export const updateUserMutation = {
    name: "UpdateUserMutation",
    type: UserMutationPayload,
    args: {input: {type: UserMutationInputType}},
    resolve: async(root: Object, {input}:{input:Object}) => {
        console.log("RESOLVE IT!");

        const {id, token} = input;
        const viewer = await getUserByAuthToken(token);
        if (!viewer) {
            console.log("NO VIEWER; FUCK OFF");
        }

        const user = await User.getById(viewer, id);
        if (!user) {
            throw "No such user.";
        }
        if (input.token !== undefined) {
            user.token = input.token;
        }
        if (input.email !== undefined) {
            user.email = input.email;
        }
        if (input.firstName !== undefined) {
            user.firstName = input.firstName;
        }
        if (input.lastName !== undefined) {
            user.lastName = input.lastName;
        }
        if (input.profilePhotoUrl !== undefined) {
            user.profilePhotoUrl = input.profilePhotoUrl;
        }
        const updatedUser = await User.updateUser(viewer, user);
        return {
            clientMutationId: input.clientMutationId,
            user: updatedUser
        }
    }
};

registerType(UserType, (id: string) => getUserByUuid(id))