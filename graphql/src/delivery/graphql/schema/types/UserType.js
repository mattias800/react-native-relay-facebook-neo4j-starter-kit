/* @flow */
import {GraphQLObjectType, GraphQLString, GraphQLInt} from "graphql";
import {EmailType, AuthTokenType} from "../types";
import {User} from "../../../../entities/User";
import * as UserService from "../../../../persistence/service/UserService";
import {getUserById, getNumFriendsFor} from "../../../../persistence/service/UserService";
import {registerTypeInNodeInterface} from "../../../../type-registry/registry";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField, connectionArgs} from "graphql-relay";
import {GraphQLBoolean} from "graphql/type/scalars";
import {GraphQLList, GraphQLNonNull} from "graphql/type/definition";
import {PageInfo} from "./connection/PageInfo";
import {CursorType} from "./connection/Cursor";
import {limitResult, getPageInfo} from "../../../../persistence/util/GraphQlHelper";
import * as AnimalService from "../../../../persistence/service/AnimalService";
import {getNumAnimalsFor} from "../../../../persistence/service/AnimalService";
import {AnimalConnection} from "./AnimalType";
import {PhotoConnection} from "./PhotoType";
import * as PhotoService from "../../../../persistence/service/PhotoService";
import * as FriendRequestService from "../../../../persistence/service/FriendRequestService";
import {FriendRequestType} from "./FriendRequestType";

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
        isCompleteProfile: {type: GraphQLBoolean, resolve: user => user.isCompleteProfile()},
        isCurrentUser: {type: GraphQLBoolean, resolve: (user, args, {actor}) => user.id === actor.id},
        isFriend: {type: GraphQLBoolean, resolve: (user, args, {actor}) => UserService.isFriends(user, actor)},
        numFriends: {type: GraphQLInt, resolve: user => getNumFriendsFor(user)},
        numAnimals: {type: GraphQLInt, resolve: user => getNumAnimalsFor(user)},
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
                    animals: limitResult(animals, args),
                    pageInfo: getPageInfo(animals, args)
                };
            }
        },
        taggedPhotos: {
            type: PhotoConnection,
            args: connectionArgs,
            resolve: async(user, args) => {
                const photos = await PhotoService.getPhotosThatUserIsTaggedInConnection(user, args);
                return {
                    photos: limitResult(photos, args),
                    pageInfo: getPageInfo(photos, args)
                };
            }
        },
        activeIncomingFriendRequests: {
            type: new GraphQLList(FriendRequestType),
            resolve: async(user) => {
                const friendRequests = await FriendRequestService.getActiveIncomingFriendRequests(user);
                return friendRequests;
            }
        },
        activeOutgoingFriendRequests: {
            type: new GraphQLList(FriendRequestType),
            resolve: async(user) => {
                const friendRequests = await FriendRequestService.getActiveOutgoingFriendRequests(user);
                return friendRequests;
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

registerTypeInNodeInterface(UserType, User, (id: string) => getUserById(id));