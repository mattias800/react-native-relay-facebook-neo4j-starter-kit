// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {UserType, UserMutationType} from "./delivery/graphql/schema/types/User";
import {User} from "./models/User";

export const MutationViewerType = new GraphQLObjectType({
    name: "MutationViewer",
    description: "Viewer type",

    fields: () => ({
        user: {
            type: UserMutationType,
            args: {id: {type: GraphQLString}},
            resolve: (viewer, {id}) => User.getById(viewer, id)
        },
        actor: {
            type: UserMutationType,
            resolve: ({actor}, args, context) => {
                return {viewer: actor, user: actor};
            }
        }
    })
});

