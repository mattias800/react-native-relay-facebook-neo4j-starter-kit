// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserType} from "./delivery/graphql/schema/types/User";
import {User} from "./models/User";

export const QueryViewerType = new GraphQLObjectType({
    name: "QueryViewer",
    description: "Viewer type",

    fields: () => ({
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve: (viewer, {id}) => User.getById(viewer, id)
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: (viewer, args) => User.getAllWithCompleteProfile(viewer)
        },
        actor: {
            type: UserType,
            resolve: (viewer, args, context) => {
                return viewer.actor;
            }
        }
    })
});

