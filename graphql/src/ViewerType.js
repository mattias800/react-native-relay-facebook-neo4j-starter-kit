/* @flow */
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserType, UserConnection} from "./delivery/graphql/schema/types/UserType";
import {User} from "./entities/User";
import * as UserService from "./persistence/service/UserService";
import {fromGlobalId} from "graphql-relay/lib/node/node";
import {connectionArgs} from "graphql-relay";
import {getPageInfo, limitResult} from "./persistence/util/GraphQlHelper";
import {AnimalType} from "./delivery/graphql/schema/types/AnimalType";

export const ViewerType = new GraphQLObjectType({
    name: "Viewer",
    description: "Viewer type",

    fields: () => ({
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve: (parent, {id}, {actor}) => User.getById(actor, fromGlobalId(id).id)
        },
        userByEmail: {
            type: UserType,
            args: {email: {type: GraphQLString}},
            resolve: (parent, {email}, {actor}) => User.getByEmail(actor, email)
        },
        animal: {
            type: AnimalType,
            args: {id: {type: GraphQLString}},
            resolve: (parent, {id}, {actor}) => User.getById(actor, fromGlobalId(id).id)
        },
        users: {
            type: UserConnection,
            args: connectionArgs,
            resolve: async(parent, args, {actor}) => {
                let users = await UserService.getAllUsersConnection(args);
                return {
                    users: limitResult(users, args),
                    pageInfo: getPageInfo(users, args)
                };
            }
        },
        incompleteUsers: {
            type: new GraphQLList(UserType),
            resolve: (parent, args, {actor}) => UserService.getAllUsersWithIncompleteProfile()
        },
        actor: {
            type: UserType,
            resolve: (parent, args, {actor}) => {
                return actor;
            }
        }
    })
});

