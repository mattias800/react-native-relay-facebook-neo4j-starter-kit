import {verifyToken, generateToken} from "../JwtService";
describe("JwtService", () => {

    it("should work", () => {
        var email = "mattias800@gmail.com";
        const token = generateToken(email);
        console.log(token);
        const re = verifyToken(email, token);
        console.log(re);

    });
});