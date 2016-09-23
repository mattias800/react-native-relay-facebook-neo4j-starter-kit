import {GraphQLString, GraphQLList} from "graphql";
import {UserType} from "../schema/types/User";
import {getUserById, getAllUsers} from "../service/UserService";

export const user = {
    type: UserType,
    args: {id: {type: GraphQLString}},
    resolve: (root, args) => getUserById(args.id)
};

export const users = {
    type: new GraphQLList(UserType),
    resolve: (root, args) => getAllUsers()
};
