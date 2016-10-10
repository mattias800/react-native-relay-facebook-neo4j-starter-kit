/* @flow */
import {GraphQLObjectType} from "graphql";
import {createAnimalMutation} from "./delivery/graphql/schema/mutations/animal/CreateAnimalMutation";
import {updateUserMutation} from "./delivery/graphql/schema/mutations/users/UpdateUserMutation";

export const MutationRoot = new GraphQLObjectType({
    name: "MutationRoot",
    description: "Root mutation",

    fields: () => ({
        updateUser: updateUserMutation,
        createAnimal: createAnimalMutation
    })
});

