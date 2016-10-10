import {mutationWithClientMutationId, fromGlobalId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import {FriendRequestType} from "../../types/FriendRequestType";
import {createFriendRequest} from "../../../../../persistence/service/FriendRequestService";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import {validateToken} from "../../../../../services/Authenticator";

export const createFriendRequestMutation = mutationWithClientMutationId(
    {
        name: 'CreateFriendRequest',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            friendRequest: {type: FriendRequestType},
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
