/* @flow */
import {GraphQLObjectType, GraphQLString, GraphQLBoolean} from "graphql";
import {registerTypeInNodeInterface} from "../../../../type-registry/registry";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField} from "graphql-relay";
import {UserType} from "./UserType";
import * as FriendRequestService from "../../../../persistence/service/FriendRequestService";
import {FriendRequest} from "../../../../entities/FriendRequest";

export const FriendRequestType = new GraphQLObjectType({
    name: "FriendRequest",
    description: "A friend request.",
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('FriendRequest'),
        createdAt: {type: GraphQLString},
        sender: {type: UserType},
        receiver: {type: UserType},
        declined: {type: GraphQLBoolean},
        accepted: {type: GraphQLBoolean},
        ignored: {type: GraphQLBoolean},
    })
});

registerTypeInNodeInterface(FriendRequestType,
                            FriendRequest,
                            (id: string) => FriendRequestService.getFriendRequestById(id));

