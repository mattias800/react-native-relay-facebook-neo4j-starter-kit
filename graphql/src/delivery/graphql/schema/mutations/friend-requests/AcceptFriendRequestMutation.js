import {mutationWithClientMutationId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import * as FriendRequestService from "../../../../../persistence/service/FriendRequestService";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import * as Authenticator from "../../../../../services/Authenticator";
import {getLocalId} from "../../../../../persistence/util/IdParser";

export const acceptFriendRequestMutation = mutationWithClientMutationId(
    {
        name: 'AcceptFriendRequest',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            sender: {type: UserType},
            receiver: {type: UserType}
        },
        mutateAndGetPayload: async({token, userId}) => {
            const receiver = await Authenticator.getAndValidateUserByToken(token);
            const sender = await User.getById(receiver, getLocalId(userId));
            await FriendRequestService.acceptFriendRequest(sender, receiver);

            return {
                receiver,
                sender
            };
        }
    });
