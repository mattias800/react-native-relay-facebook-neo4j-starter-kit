// @flow
import {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull} from "graphql";
import {UserIdType, EmailType, AuthTokenType} from "../types";
import {AnimalType} from "./Animal";
import {getAnimalOwnedByUserById} from "../../../../persistence/service/AnimalService";
import {User} from "../../../../models/User";
import {updateUser} from "../../../../persistence/service/UserService";

export const UserType = new GraphQLObjectType({
    name: "User",
    description: "A user.",

    fields: () => ({
        id: {
            type: UserIdType
        },
        token: {
            type: AuthTokenType
        },
        email: {
            type: EmailType
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        profilePhotoUrl: {
            type: GraphQLString
        },
        animals: {
            type: new GraphQLList(AnimalType),
            resolve: (user) => getAnimalOwnedByUserById(user.id)
        }
    })
});

export const UserMutationType = new GraphQLObjectType({
    name: "UserMutation",
    description: "A user mutation",

    fields: () => ({
        setToken: {
            type: AuthTokenType,
            args: {token: {type: new GraphQLNonNull(GraphQLString)}},
            resolve: async({viewer, user}, {token}) => {
                user.token = token;
                await User.updateUser(viewer, user);
                return token;
            }
        },
        setEmail: {
            type: EmailType,
            args: {email: {type: new GraphQLNonNull(GraphQLString)}},
            resolve: async({viewer, user}, {email}) => {
                user.email = email;
                await User.updateUser(viewer, user);
                return email;
            }
        },
        setFirstName: {
            type: GraphQLString,
            args: {firstName: {type: new GraphQLNonNull(GraphQLString)}},
            resolve: async({viewer, user}, {firstName}) => {
                user.firstName = firstName;
                await User.updateUser(viewer, user);
                return firstName;
            }
        },
        setLastName: {
            type: GraphQLString,
            args: {lastName: {type: new GraphQLNonNull(GraphQLString)}},
            resolve: async({viewer, user}, {lastName}) => {
                user.lastName = lastName;
                await User.updateUser(viewer, user);
                return lastName;
            }
        },
        setProfilePhotoUrl: {
            type: GraphQLString,
            args: {profilePhotoUrl: {type: new GraphQLNonNull(GraphQLString)}},
            resolve: async({viewer, user}, {profilePhotoUrl}) => {
                user.profilePhotoUrl = profilePhotoUrl;
                await User.updateUser(viewer, user);
                return profilePhotoUrl;
            }
        }
    })
});

