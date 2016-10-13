import {mutationWithClientMutationId, fromGlobalId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import {deleteFriendRequest} from "../../../../../persistence/service/FriendRequestService";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import {validateToken} from "../../../../../services/Authenticator";

export const cancelFriendRequestMutation = mutationWithClientMutationId(
    {
        name: 'CancelFriendRequest',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            sender: {type: UserType},
            receiver: {type: UserType}
        },
        mutateAndGetPayload: async({token, userId}) => {
            const sender = await validateToken(token);
            const receiver = await User.getById(sender, fromGlobalId(userId).id);
            await deleteFriendRequest(sender, receiver);

            return {
                receiver,
                sender
            };
        }
    });
