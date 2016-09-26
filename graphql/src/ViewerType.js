// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserType} from "./delivery/graphql/schema/types/User";
import {User} from "./models/User";
import * as UserService from "./persistence/service/UserService";

export const ViewerType = new GraphQLObjectType({
    name: "Viewer",
    description: "Viewer type",

    fields: () => ({
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve: ({actor}, {id}) => User.getById(actor, id)
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: ({actor}, args) => User.getAllWithCompleteProfile(actor)
        },
        incompleteUsers: {
            type: new GraphQLList(UserType),
            resolve: ({actor}, args) => UserService.getAllUsersWithIncompleteProfile()
        },
        actor: {
            type: UserType,
            resolve: (viewer, args, context) => {
                return viewer.actor;
            }
        }
    })
});

