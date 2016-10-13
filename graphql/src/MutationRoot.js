/* @flow */
import {GraphQLObjectType} from "graphql";
import {createAnimalMutation} from "./delivery/graphql/schema/mutations/animal/CreateAnimalMutation";
import {updateUserMutation} from "./delivery/graphql/schema/mutations/users/UpdateUserMutation";
import {createFriendRequestMutation} from "./delivery/graphql/schema/mutations/friend-requests/CreateFriendRequestMutation";
import {cancelFriendRequestMutation} from "./delivery/graphql/schema/mutations/friend-requests/CancelFriendRequestMutation";

export const MutationRoot = new GraphQLObjectType({
    name: "MutationRoot",
    description: "Root mutation",

    fields: () => ({
        updateUser: updateUserMutation,
        createAnimal: createAnimalMutation,
        createFriendRequest: createFriendRequestMutation,
        cancelFriendRequest: cancelFriendRequestMutation
    })
});

