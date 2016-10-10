import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from "graphql";
import {UserIdType, AuthTokenType, EmailType} from "../../types";
import {User} from "../../../../../entities/User";
import {fromGlobalId} from "graphql-relay";
import {UserType} from "../../types/UserType";

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
    resolve: async(root: ?Object, args: Object, {actor}) => {
        const {input} = args;
        const {id, token} = input;

        const user = await User.getById(actor, fromGlobalId(id).id);

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
        const updatedUser = await User.updateUser(actor, user);

        return {
            clientMutationId: input.clientMutationId,
            user: updatedUser
        }
    }
};
