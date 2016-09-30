/* @flow */
import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserIdType, EmailType, AuthTokenType} from "../types";
import {User} from "../../../../entities/User";
import {getUserById, getFriendsFor} from "../../../../persistence/service/UserService";
import {registerType} from "../../../../type-registry/registry";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField} from "graphql-relay";
import {fromGlobalId} from "graphql-relay/lib/node/node";
import {validateToken} from "../../../../services/Authenticator";

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
        profilePhotoUrl: {type: GraphQLString},
        friends: {
            type: new GraphQLList(UserType),
            resolve: (user => getFriendsFor(user))
        }
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
    resolve: async(root, args) => {
        const {input} = args;
        const {id, token} = input;

        const viewer = await validateToken(token);

        const user = await User.getById(viewer, fromGlobalId(id).id);

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

registerType(UserType, User, (id: string) => getUserById(id));