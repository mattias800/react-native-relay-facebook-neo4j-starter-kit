// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserType} from "./User";
import {User} from "../../../../models/User";

export const ViewerType = new GraphQLObjectType({
    name: "Viewer",
    description: "Viewer type",

    fields: () => ({
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve: (viewer, {id}) => User.getById(viewer, id)
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: (viewer, args) => User.getAll(viewer)
        },
        actor: {
            type: UserType,
            resolve: (viewer, args, context) => {
                return viewer.actor;
            }
        }
    })
});

