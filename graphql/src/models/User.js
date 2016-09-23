import {getUserByEmail} from "../persistence/service/UserService";
import {getUserByUuid} from "../persistence/service/UserService";
import {getAllUsers} from "../persistence/service/UserService";
import {getAllUsersWithCompleteProfile} from "../persistence/service/UserService";

export class User {

    id: string;
    token: string;
    firstName: ?string;
    lastName: ?string;
    email: ?string;
    profilePhotoUrl: ?string;

    constructor(id: string,
                token: string,
                firstName: ?string,
                lastName: ?string,
                email: ?string,
                profilePhotoUrl: ?string) {
        this.id = id;
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePhotoUrl = profilePhotoUrl;
    }

    static createFromEntity(entity: Object): User {
        return new User(entity.properties.uuid,
            entity.properties.token,
            entity.properties.firstName,
            entity.properties.lastName,
            entity.properties.email,
            entity.properties.profilePhotoUrl
        );
    }

    static async getByEmail(viewer, email: string): Promise<?User> {
        const user = await getUserByEmail(email);
        if (user == null) return null;
        return user;
    }

    static async getById(viewer, id: string): Promise<?User> {
        const user = await getUserByUuid(id);
        if (user == null) return null;
        return user;
    }

    static async getAll(viewer): Promise<Array<User>> {
        const users = await getAllUsers();
        if (users == null) return [];
        return users
    }

    static async getAllWithCompleteProfile(viewer): Promise<Array<User>> {
        const users = await getAllUsersWithCompleteProfile();
        if (users == null) return [];
        return users
    }

}