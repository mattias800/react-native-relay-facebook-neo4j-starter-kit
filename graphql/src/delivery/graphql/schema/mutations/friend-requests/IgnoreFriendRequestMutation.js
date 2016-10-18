import {mutationWithClientMutationId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import * as Authenticator from "../../../../../services/Authenticator";
import * as FriendRequestService from "../../../../../persistence/service/FriendRequestService";
import {getLocalId} from "../../../../../persistence/util/IdParser";

export const ignoreFriendRequestMutation = mutationWithClientMutationId(
    {
        name: 'IgnoreFriendRequest',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            sender: {type: UserType},
            receiver: {type: UserType}
        },
        mutateAndGetPayload: async({token, userId}) => {
            const receiver: User = await Authenticator.getAndValidateUserByToken(token);
            const sender: User = await User.getById(receiver, getLocalId(userId));

            await FriendRequestService.ignoreFriendRequest(sender, receiver);

            return {
                receiver,
                sender
            };
        }
    });
