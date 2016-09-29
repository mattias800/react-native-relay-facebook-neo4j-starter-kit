/* @flow */
import {GraphQLObjectType} from "graphql";
import {updateUserMutation} from "./delivery/graphql/schema/types/UserType";

export const MutationRoot = new GraphQLObjectType({
    name: "MutationRoot",
    description: "Root mutation",

    fields: () => ({
        updateUser: updateUserMutation
    })
});

