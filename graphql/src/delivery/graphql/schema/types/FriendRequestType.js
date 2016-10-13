/* @flow */
import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLBoolean} from "graphql";
import {FriendRequestIdType} from "../types";
import {registerTypeInNodeInterface} from "../../../../type-registry/registry";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField} from "graphql-relay";
import {fromGlobalId} from "graphql-relay/lib/node/node";
import {validateToken} from "../../../../services/Authenticator";
import {UserType} from "./UserType";
import {Animal} from "../../../../entities/Animal";
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

export const FriendRequestInputType = new GraphQLInputObjectType({
    name: "FriendRequestInputType",
    fields: () => ({
        clientMutationId: {type: GraphQLString},
        id: {type: FriendRequestIdType},
        accepted: {type: GraphQLBoolean},
        declined: {type: GraphQLBoolean},
        ignored: {type: GraphQLBoolean}
    })
});

export const FriendRequestPayload = new GraphQLObjectType({
    name: "FriendRequestPayload",
    fields: () => ({
        clientMutationId: {type: GraphQLString},
        friendRequest: {type: FriendRequestType}
    })
});

export const updateFriendRequest = {
    name: "UpdateFriendRequest",
    type: FriendRequestPayload,
    args: {input: {type: FriendRequestInputType}},
    resolve: async(root: Object, args: Object) => {
        const {input} = args;
        const {token, id, accepted, declined, ignored} = input;

        const viewer = await validateToken(token);

        const animal = await Animal.getById(viewer, fromGlobalId(id).id);


        if (!animal) {
            throw "No such animal.";
        }

        if (input.fullName !== undefined) {
            animal.fullName = input.fullName;
        }
        if (input.nickName !== undefined) {
            animal.nickName = input.nickName;
        }
        if (input.animalKind !== undefined) {
            animal.animalKind = input.animalKind;
        }
        if (input.birthDate !== undefined) {
            animal.birthDate = input.birthDate;
        }
        if (input.deathDate !== undefined) {
            animal.deathDate = input.deathDate;
        }
        if (input.deceased !== undefined) {
            animal.deceased = input.deceased;
        }
        if (input.litterId !== undefined) {
            animal.litterId = input.litterId;
        }
        if (input.profilePhotoUrl !== undefined) {
            animal.profilePhotoUrl = input.profilePhotoUrl;
        }
        const updatedAnimal = await Animal.updateAnimal(viewer, animal);

        return {
            clientMutationId: input.clientMutationId,
            animal: updatedAnimal
        }
    }
};


registerTypeInNodeInterface(FriendRequestType,
                            FriendRequest,
                            (id: string) => FriendRequestService.getFriendRequestById(id));