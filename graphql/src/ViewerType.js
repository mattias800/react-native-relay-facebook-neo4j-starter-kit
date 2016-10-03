/* @flow */
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserType, UserConnection} from "./delivery/graphql/schema/types/UserType";
import {User} from "./entities/User";
import * as UserService from "./persistence/service/UserService";
import {fromGlobalId} from "graphql-relay/lib/node/node";
import {connectionDefinitions, connectionArgs} from "graphql-relay/lib/connection/connection";
import base64 from "base-64";
import {getPageInfo, limitResult} from "./persistence/util/GraphQlHelper";

export const ViewerType = new GraphQLObjectType({
    name: "Viewer",
    description: "Viewer type",

    fields: () => ({
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve: ({actor}, {id}) => User.getById(actor, fromGlobalId(id).id)
        },
        userByEmail: {
            type: UserType,
            args: {email: {type: GraphQLString}},
            resolve: ({actor}, {email}) => User.getByEmail(actor, email)
        },
        users: {
            type: UserConnection,
            args: connectionArgs,
            resolve: async({actor}, args) => {
                let users = await UserService.getAllUsersConnection(args);
                return {
                    users: limitResult(users, args),
                    pageInfo: getPageInfo(users, args)
                };
            }
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

const {connectionType: AllUsersConnection} = connectionDefinitions(
    {
        nodeType: UserType,
        name: "AllUsersConnection",
        resolveCursor: (edge) => {
            return base64.encode(`User---${edge.node.createdAt}`);
        }
    });
