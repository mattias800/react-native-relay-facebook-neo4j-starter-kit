// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {getUserByUuid, getAllUsers, getUserByAuthToken} from "../../../../persistence/service/UserService";
import {UserType} from "./User";

export const ViewerType = new GraphQLObjectType({
    name: "Viewer",
    description: "Viewer type",

    fields: () => ({
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve: (viewer, args) => getUserByUuid(args.id)
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: (viewer, args) => getAllUsers()
        },
        actor: {
            type: UserType,
            resolve: (viewer, args, context) => {
                return viewer.actor;
            }
        }
    })
});

