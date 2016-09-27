// @flow
import {GraphQLObjectType} from "graphql";
import {updateUserMutation} from "./delivery/graphql/schema/types/User";

export const MutationRoot = new GraphQLObjectType({
    name: "MutationRoot",
    description: "Root mutation",

    fields: () => ({
        updateUser: updateUserMutation
    })
});

