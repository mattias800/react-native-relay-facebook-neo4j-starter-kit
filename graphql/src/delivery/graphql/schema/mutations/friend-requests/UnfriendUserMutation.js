import {mutationWithClientMutationId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import * as FriendRequestService from "../../../../../persistence/service/FriendRequestService";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import * as Authenticator from "../../../../../services/Authenticator";
import {getLocalId} from "../../../../../persistence/util/IdParser";

export const unfriendUserMutation = mutationWithClientMutationId(
    {
        name: 'UnfriendUser',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            actor: {type: UserType},
            user: {type: UserType}
        },
        mutateAndGetPayload: async({token, userId}) => {
            const actor = await Authenticator.getAndValidateUserByToken(token);
            const user = await User.getById(actor, getLocalId(userId));
            await FriendRequestService.unfriendUser(actor, user);

            return {
                actor,
                user
            };
        }
    });
