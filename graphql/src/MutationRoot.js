/* @flow */
import {GraphQLObjectType} from "graphql";
import {updateUserMutation} from "./delivery/graphql/schema/types/UserType";
import {createAnimalMutation} from "./delivery/graphql/schema/mutations/animal/CreateAnimalMutation";

export const MutationRoot = new GraphQLObjectType({
    name: "MutationRoot",
    description: "Root mutation",

    fields: () => ({
        updateUser: updateUserMutation,
        createAnimal: createAnimalMutation
    })
});

