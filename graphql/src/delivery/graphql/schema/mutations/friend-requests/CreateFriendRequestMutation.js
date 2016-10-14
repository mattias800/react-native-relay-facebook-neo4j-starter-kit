import {mutationWithClientMutationId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import * as FriendRequestService from "../../../../../persistence/service/FriendRequestService";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import * as Authenticator from "../../../../../services/Authenticator";
import {getLocalId} from "../../../../../persistence/util/IdParser";

export const createFriendRequestMutation = mutationWithClientMutationId(
    {
        name: 'CreateFriendRequest',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            sender: {type: UserType},
            receiver: {type: UserType}
        },
        mutateAndGetPayload: async({token, userId}) => {
            const sender = await Authenticator.getAndValidateUserByToken(token);
            const receiver = await User.getByIdElseThrow(sender, getLocalId(userId));
            const friendRequest = await FriendRequestService.createFriendRequest(sender, receiver);

            return {
                receiver,
                sender
            };
        }
    });
