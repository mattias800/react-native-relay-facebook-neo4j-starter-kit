import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from "graphql";

export const EntityTypeType = GraphQLString;

export const DateType = GraphQLString;

export const EntityIdType = GraphQLString;
export const UserIdType = EntityIdType;
export const PhotoIdType = EntityIdType;
export const AnimalIdType = EntityIdType;
export const LitterIdType = EntityIdType;
export const KennelIdType = EntityIdType;

export const EmailType = GraphQLString;
