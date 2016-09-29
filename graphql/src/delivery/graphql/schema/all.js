/* @flow */
import {GraphQLObjectType, GraphQLString} from "graphql";

export const AuthenticatedDeviceType = new GraphQLObjectType({
    name: "AuthenticatedDevice",
    description: "A device that the user has authenticated on, with authentication info.",

    fields: () => ({
        deviceId: {type: GraphQLString},
        authToken: {type: GraphQLString}
    })
});

