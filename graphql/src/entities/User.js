/* @flow */
import {
    getUserByEmail,
    getAllUsersWithCompleteProfile,
    getUserById,
    getAllUsers,
    updateUser
} from "../persistence/service/UserService";
import {Entity} from "./Entity";

export class User extends Entity {

    token: string;
    firstName: ?string;
    lastName: ?string;
    email: ?string;
    profilePhotoUrl: ?string;
    isSuperUser: boolean;

    constructor(id: string,
                createdAt: Date = new Date(),
                modifiedAt: Date = new Date(),
                deleted: boolean = false,
                deletedAt: ?Date = undefined,
                token: string,
                firstName: ?string,
                lastName: ?string,
                email: ?string,
                profilePhotoUrl: ?string,
                isSuperUser: boolean = false) {
        super(id, createdAt, modifiedAt, deleted, deletedAt);
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
            new Date(entity.properties.modifiedAt),
            Boolean(entity.properties.deleted),
            new Date(entity.properties.deletedAt),

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

    static async getByIdElseThrow(viewer: User, id: string): Promise<?User> {
        const user = await User.getById(viewer, id);
        if (user == null) {
            throw "No such user.";
        } else {
            return user;
        }
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

export const userMock = new User("", undefined, undefined, undefined, undefined, "");