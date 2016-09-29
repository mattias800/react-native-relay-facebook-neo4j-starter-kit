/* @flow */
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserType} from "./delivery/graphql/schema/types/UserType";
import {User} from "./entities/User";
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
        userByEmail: {
            type: UserType,
            args: {email: {type: GraphQLString}},
            resolve: ({actor}, {email}) => User.getByEmail(actor, email)
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

