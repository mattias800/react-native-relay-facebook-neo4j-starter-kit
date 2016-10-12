/* @flow */
import {GraphQLObjectType} from "graphql";
import {FriendRequestType} from "./FriendRequestType";

export const FriendRequestRelationType = new GraphQLObjectType({
    name: "FriendRequestRelation",
    description: "A friend request relation",

    fields: () => ({
        received: {type: FriendRequestType},
        sent: {type: FriendRequestType}
    })
});
