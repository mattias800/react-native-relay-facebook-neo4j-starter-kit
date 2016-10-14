/* @flow */
import {GraphQLObjectType, GraphQLString} from "graphql";
import {nodeInterface} from "../../../../NodeField";
import {globalIdField, connectionArgs} from "graphql-relay";
import {GraphQLList, GraphQLNonNull} from "graphql/type/definition";
import {PageInfo} from "./connection/PageInfo";
import {CursorType} from "./connection/Cursor";
import {limitResult, getPageInfo} from "../../../../persistence/util/GraphQlHelper";
import {UserConnection} from "./UserType";
import {AnimalConnection} from "./AnimalType";
import {Photo} from "../../../../entities/Photo";
import * as PhotoService from "../../../../persistence/service/PhotoService";
import {registerTypeInNodeInterface} from "../../../../type-registry/registry";

export const PhotoType = new GraphQLObjectType({
    name: "Photo",
    description: "A photo",
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Photo'),
        createdAt: {type: GraphQLString},
        url: {type: GraphQLString},
        taggedUsers: {
            type: UserConnection,
            args: connectionArgs,
            resolve: async(photo, args) => {
                let users = await PhotoService.getUsersTaggedInPhotoConnection(photo, args);
                return {
                    users: limitResult(users, args),
                    pageInfo: getPageInfo(users, args)
                };
            }

        },
        taggedAnimals: {
            type: AnimalConnection,
            args: connectionArgs,
            resolve: async(photo, args) => {
                let animals = await PhotoService.getAnimalsTaggedInPhotoConnection(photo, args);
                return {
                    animals: limitResult(animals, args),
                    pageInfo: getPageInfo(animals, args)
                };
            }

        }
    })
});

export const PhotoConnection = new GraphQLObjectType({
    name: 'PhotoConnection',
    fields: () => ({
        edges: {
            type: new GraphQLList(PhotoEdge),
            resolve: (parent) => parent.photos
        },
        pageInfo: {
            type: new GraphQLNonNull(PageInfo),
            resolve: (parent) => parent.pageInfo
        },
    }),
});

export const PhotoEdge = new GraphQLObjectType({
    name: 'PhotoEdge',
    fields: () => ({
        cursor: {
            type: CursorType,
            resolve: (photo: Photo) => ({value: photo.createdAt.toISOString()})
        },
        node: {
            type: PhotoType,
            resolve: (photo: Photo) => photo
        },
    }),
});


registerTypeInNodeInterface(PhotoType,
                            Photo,
                            (id: string) => PhotoService.getPhotoById(id));

