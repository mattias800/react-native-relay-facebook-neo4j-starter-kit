/* @flow */
import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLInt} from "graphql";
import {UserIdType, EmailType, AuthTokenType} from "../types";
import {User} from "../../../../entities/User";
import * as UserService from "../../../../persistence/service/UserService";
import {getUserById, getNumFriendsFor} from "../../../../persistence/service/UserService";
import {registerTypeInNodeInterface} from "../../../../type-registry/registry";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField, connectionArgs} from "graphql-relay";
import {fromGlobalId} from "graphql-relay/lib/node/node";
import {validateToken} from "../../../../services/Authenticator";
import {GraphQLBoolean} from "graphql/type/scalars";
import {GraphQLList, GraphQLNonNull} from "graphql/type/definition";
import {PageInfo} from "./connection/PageInfo";
import {CursorType} from "./connection/Cursor";
import {limitResult, getPageInfo} from "../../../../persistence/util/GraphQlHelper";
import * as AnimalService from "../../../../persistence/service/AnimalService";
import {getNumAnimalsFor} from "../../../../persistence/service/AnimalService";
import {AnimalConnection} from "./AnimalType";

export const UserType = new GraphQLObjectType({
    name: "User",
    description: "A user.",
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('User'),
        token: {type: AuthTokenType},
        createdAt: {type: GraphQLString},
        email: {type: EmailType},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        profilePhotoUrl: {type: GraphQLString},
        isCompleteProfile: {
            type: GraphQLBoolean,
            resolve: user => user.isCompleteProfile()
        },
        isCurrentUser: {
            type: GraphQLBoolean,
            resolve: user => false
        },
        isFriend: {
            type: GraphQLBoolean,
            resolve: user => true
        },
        numFriends: {
            type: GraphQLInt,
            resolve: user => getNumFriendsFor(user)
        },
        numAnimals: {
            type: GraphQLInt,
            resolve: user => getNumAnimalsFor(user)
        },
        friends: {
            type: UserConnection,
            args: connectionArgs,
            resolve: async(user, args) => {
                const friends = await UserService.getFriendsOfUserConnection(user, args);
                return {
                    users: limitResult(friends, args),
                    pageInfo: getPageInfo(friends, args)
                };
            }
        },
        animals: {
            type: AnimalConnection,
            args: connectionArgs,
            resolve: async(user, args) => {
                const animals = await AnimalService.getAnimalsOwnedByUserConnection(user, args);
                return {
                    users: limitResult(animals, args),
                    pageInfo: getPageInfo(animals, args)
                };
            }
        }
    })
});

export const UserConnection = new GraphQLObjectType({
    name: 'UserConnection',

    fields: () => ({
        edges: {
            type: new GraphQLList(UserEdge),
            resolve: (parent) => parent.users
        },
        pageInfo: {
            type: new GraphQLNonNull(PageInfo),
            resolve: (parent) => parent.pageInfo
        },
    }),
});

export const UserEdge = new GraphQLObjectType({
    name: 'UserEdge',
    fields: () => ({
        cursor: {
            type: CursorType,
            resolve: (user: User) => ({value: user.createdAt.toISOString()})
        },
        node: {
            type: UserType,
            resolve: (user: User) => user
        },
    }),
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
    resolve: async(root: Object, args: Object) => {
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

registerTypeInNodeInterface(UserType, User, (id: string) => getUserById(id));