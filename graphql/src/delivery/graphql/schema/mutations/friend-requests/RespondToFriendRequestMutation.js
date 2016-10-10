import {mutationWithClientMutationId, fromGlobalId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import {createFriendRequest} from "../../../../../persistence/service/FriendRequestService";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import {validateToken} from "../../../../../services/Authenticator";

export const createFriendRequestMutation = mutationWithClientMutationId(
    {
        name: 'CreateFriendRequest',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            friendRequestId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            user: {type: UserType}
        },
        mutateAndGetPayload: async({token, userId}) => {
            const user = await validateToken(token);
            const targetUser = User.getById(user, fromGlobalId(userId).id);
            const friendRequest = await createFriendRequest(user, targetUser);

            return {
                friendRequest,
                user
            };
        }
    });
