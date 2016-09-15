import jwt from 'jsonwebtoken';
import {getJwtSecret} from "../../config/JwtConfig";


export function generateToken(uuid: string) {
    return jwt.sign({uuid}, getJwtSecret());
}

export function verifyToken(uuid: string, token: string) {
    try {
        var verify = jwt.verify(token, getJwtSecret());
    } catch (e) {
        return false;
    }
    return verify.uuid === uuid;
}
