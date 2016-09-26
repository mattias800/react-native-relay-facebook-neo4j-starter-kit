import {getUserByEmail} from "../persistence/service/UserService";
import {getUserByUuid} from "../persistence/service/UserService";
import {getAllUsers} from "../persistence/service/UserService";
import {getAllUsersWithCompleteProfile} from "../persistence/service/UserService";
import {updateUser} from "../persistence/service/UserService";

export class User {

    id: string;
    token: string;
    firstName: ?string;
    lastName: ?string;
    email: ?string;
    profilePhotoUrl: ?string;
    completeProfile: boolean;

    constructor(id: string,
                token: string,
                firstName: ?string,
                lastName: ?string,
                email: ?string,
                profilePhotoUrl: ?string,
                completeProfile: boolean) {
        this.id = id;
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePhotoUrl = profilePhotoUrl;
        this.completeProfile = completeProfile;
    }

    static createFromEntity(entity: Object): User {
        return new User(entity.properties.uuid,
            entity.properties.token,
            entity.properties.firstName,
            entity.properties.lastName,
            entity.properties.email,
            entity.properties.profilePhotoUrl,
            entity.properties.completeProfile || User.isEntityCompleteProfile(entity)
        );
    }

    static async getByEmail(viewer: User, email: string): Promise<?User> {
        const user = await getUserByEmail(email);
        if (user == null) return null;
        return user;
    }

    static async getById(viewer: User, id: string): Promise<?User> {
        const user = await getUserByUuid(id);
        if (user == null) return null;
        return user;
    }

    static async getAll(viewer): Promise<Array<User>> {
        const users = await getAllUsers();
        if (users == null) return [];
        return users
    }

    static async getAllWithCompleteProfile(viewer: User): Promise<Array<User>> {
        const users = await getAllUsersWithCompleteProfile();
        if (users == null) return [];
        return users
    }

    static async updateUser(viewer: User, user: User) {
        if (viewer.id !== user.id) {
            throw "Updating other user than self is not allowed.";
        }
        return await updateUser(user);
    }

    isCompleteProfile() {
        return Boolean(this.firstName && this.lastName && this.email);
    }

    static isEntityCompleteProfile(entity) {
        return Boolean(entity.properties.firstName && entity.properties.lastName && entity.properties.email);
    }

}