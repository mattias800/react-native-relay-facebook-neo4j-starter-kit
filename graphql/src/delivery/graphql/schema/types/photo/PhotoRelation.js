/* @flow */
import {GraphQLObjectType} from "graphql";
import {PhotoIdType} from "../../types";

export const PhotoRelationType = new GraphQLObjectType({
    name: "PhotoRelation",
    description: "A relation between a photo and an entity",

    fields: () => ({
        photo: {type: PhotoIdType},
        ref: {type: EntityReferenceType}
    })

});

