/* @flow */
import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLInt} from "graphql";
import {AnimalIdType} from "../types";
import {registerTypeInNodeInterface} from "../../../../type-registry/registry";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField, connectionArgs} from "graphql-relay";
import {fromGlobalId} from "graphql-relay/lib/node/node";
import {validateToken} from "../../../../services/Authenticator";
import {GraphQLList, GraphQLNonNull} from "graphql/type/definition";
import {PageInfo} from "./connection/PageInfo";
import {CursorType} from "./connection/Cursor";
import {limitResult, getPageInfo} from "../../../../persistence/util/GraphQlHelper";
import {UserConnection} from "./UserType";
import * as AnimalService from "../../../../persistence/service/AnimalService";
import {Animal} from "../../../../entities/Animal";
import {PhotoConnection} from "./PhotoType";
import * as PhotoService from "../../../../persistence/service/PhotoService";

export const AnimalType = new GraphQLObjectType({
    name: "Animal",
    description: "An animal.",
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Animal'),
        createdAt: {type: GraphQLString},
        fullName: {type: GraphQLString},
        nickName: {type: GraphQLString},
        profilePhotoUrl: {type: GraphQLString},
        numOwners: {
            type: GraphQLInt,
            resolve: user => AnimalService.getNumOwnersForAnimal(user)
        },
        owners: {
            type: UserConnection,
            args: connectionArgs,
            resolve: async(animal, args) => {
                let users = await AnimalService.getOwnersOfAnimalConnection(animal, args);
                return {
                    users: limitResult(users, args),
                    pageInfo: getPageInfo(users, args)
                };
            }
        },
        taggedPhotos: {
            type: PhotoConnection,
            args: connectionArgs,
            resolve: async(animal, args) => {
                const photos = await PhotoService.getPhotosThatAnimalIsTaggedInConnection(animal, args);
                return {
                    photos: limitResult(photos, args),
                    pageInfo: getPageInfo(photos, args)
                };
            }
        }
    })
});

export const AnimalConnection = new GraphQLObjectType({
    name: 'AnimalConnection',
    fields: () => ({
        edges: {
            type: new GraphQLList(AnimalEdge),
            resolve: (parent) => parent.animals
        },
        pageInfo: {
            type: new GraphQLNonNull(PageInfo),
            resolve: (parent) => parent.pageInfo
        },
    }),
});

export const AnimalEdge = new GraphQLObjectType({
    name: 'AnimalEdge',
    fields: () => ({
        cursor: {
            type: CursorType,
            resolve: (animal: Animal) => ({value: animal.createdAt.toISOString()})
        },
        node: {
            type: AnimalType,
            resolve: (animal: Animal) => animal
        },
    }),
});

export const AnimalMutationInputType = new GraphQLInputObjectType({
    name: "AnimalMutationInputType",
    fields: () => ({
        clientMutationId: {type: GraphQLString},
        id: {type: AnimalIdType},
        fullName: {type: GraphQLString},
        nickName: {type: GraphQLString},
        profilePhotoUrl: {type: GraphQLString}
    })
});

export const AnimalMutationPayload = new GraphQLObjectType({
    name: "AnimalMutationPayload",
    fields: () => ({
        clientMutationId: {type: GraphQLString},
        animal: {type: AnimalType}
    })
});

export const updateAnimalMutation = {
    name: "UpdateAnimalMutation",
    type: AnimalMutationPayload,
    args: {input: {type: AnimalMutationInputType}},
    resolve: async(root: Object, args: Object) => {
        const {input} = args;
        const {id, token} = input;

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


registerTypeInNodeInterface(AnimalType, Animal, (id: string) => AnimalService.getAnimalById(id));