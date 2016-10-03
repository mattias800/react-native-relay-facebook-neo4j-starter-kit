import base64 from "base-64";
import {GraphQLScalarType} from "graphql";
import {Kind} from "graphql/language";

export function toCursor({value}) {
    return base64.encode(value.toString());
}

export function fromCursor(string) {
    const value = base64.decode(string);
    if (value) {
        return {value};
    } else {
        return null;
    }
}

export const CursorType = new GraphQLScalarType({
    name: 'Cursor',
    serialize(value) {
        if (value.value) {
            return toCursor(value);
        } else {
            return null;
        }
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return fromCursor(ast.value);
        } else {
            return null;
        }
    },
    parseValue(value) {
        return fromCursor(value);
    },
});
