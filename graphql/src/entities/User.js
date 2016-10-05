/* @flow */
import {
    getUserByEmail,
    getAllUsersWithCompleteProfile,
    getUserById,
    getAllUsers,
    updateUser
} from "../persistence/service/UserService";

export class User {

    id: string;
    createdAt: Date;
    token: string;
    firstName: ?string;
    lastName: ?string;
    email: ?string;
    profilePhotoUrl: ?string;
    isSuperUser: boolean;

    constructor(id: string,
                createdAt: Date,
                token: string,
                firstName: ?string,
                lastName: ?string,
                email: ?string,
                profilePhotoUrl: ?string,
                isSuperUser: boolean = false) {
        this.id = id;
        this.createdAt = createdAt;
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePhotoUrl = profilePhotoUrl;
        this.isSuperUser = isSuperUser;
    }

    isCompleteProfile() {
        return Boolean(this.firstName && this.lastName && this.email);
    }

    static createFromEntity(entity: ?Object): User {
        if (!entity) {
            throw "User.createFromEntity() got undefined entity as argument.";
        }
        return new User(
            entity.properties.id,
            new Date(entity.properties.createdAt),
            entity.properties.token,
            entity.properties.firstName,
            entity.properties.lastName,
            entity.properties.email,
            entity.properties.profilePhotoUrl,
            Boolean(entity.properties.isSuperUser)
        );
    }

    static async getByEmail(viewer: User, email: string): Promise<?User> {
        const user = await getUserByEmail(email);
        if (user == null) return null;
        return user;
    }

    static async getById(viewer: User, id: string): Promise<?User> {
        const user = await getUserById(id);
        if (user == null) return null;
        return user;
    }

    static async getAll(viewer): Promise<Array<User>> {
        console.log("getAll");

        const users = await getAllUsers();
        if (users == null) return [];
        return users
    }

    static async getAllWithCompleteProfile(viewer: User): Promise<Array<User>> {
        console.log("getAllWithCompleteProfile");

        const users = await getAllUsersWithCompleteProfile();
        if (users == null) return [];
        return users
    }

    static async updateUser(viewer: User, user: User): Promise<User> {
        if (viewer.id === user.id || viewer.isSuperUser) {
            return await updateUser(user);
        } else {
            throw "Updating other user is not allowed.";
        }

    }

}

export const userMock = new User("", new Date(), "");