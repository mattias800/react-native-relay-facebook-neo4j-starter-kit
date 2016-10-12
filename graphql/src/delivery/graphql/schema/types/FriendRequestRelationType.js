/* @flow */
import {GraphQLObjectType} from "graphql";
import {FriendRequestType} from "./FriendRequestType";

export const FriendRequestRelationType = new GraphQLObjectType({
    name: "FriendRequestRelation",
    description: "A friend request relation",

    fields: () => ({
        incoming: {type: FriendRequestType},
        outgoing: {type: FriendRequestType}
    })
});
