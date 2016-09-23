// @flow
import {GraphQLObjectType} from "graphql";
import {EntityTypeType, EntityIdType} from "../../types";

export const EntityReferenceType = new GraphQLObjectType({
    name: "EntityReference",
    description: "A reference to an entity",

    fields: () => ({
        entityType: {type: EntityTypeType},
        id: {type: EntityIdType}
    })

});

