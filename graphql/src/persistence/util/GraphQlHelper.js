import {GraphQLInt} from "graphql/type/scalars";
import {CursorType} from "../../delivery/graphql/schema/types/connection/Cursor";
import base64 from "base-64";

export function createConnectionArguments() {
    return {
        first: {
            type: GraphQLInt,
        },
        last: {
            type: GraphQLInt,
        },
        before: {
            type: CursorType,
        },
        after: {
            type: CursorType,
        },
    };
}

export function decodeCursor(cursor: string): string {
    if (!cursor) {
        throw "Error: decodeCursor() did not get cursor as parameter."
    }
    return base64.decode(cursor);
}

export function getPageInfo(array, connectionArgs) {
    const {first, last, before, after} = connectionArgs;
    const count = array.length;

    return {
        hasNextPage: Boolean(first && count > first),
        hasPreviousPage: Boolean(last && count > last),
    };
}

export function limitResult(list, connectionArgs) {
    if (!connectionArgs) {
        return list;
    }
    const count = list.length;
    let result = list;

    const {first, last, before, after} = connectionArgs;
    if (first && first < count) {
        result = list.slice(0, -(count - first))
    } else if (last && last < count) {
        result = list.slice(count - last);
    }
    return result;
}

export function getQueryProps(type) {
    return Object.keys(type).map(key => `${key}: {${key}}`).join(", ");
}

