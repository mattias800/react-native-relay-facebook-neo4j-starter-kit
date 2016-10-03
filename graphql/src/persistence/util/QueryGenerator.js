import base64 from "base-64";
import {decodeCursor} from "./GraphQlHelper";

export function getConnectionMatchQuery(label: string,
                                        returnVariableName: string,
                                        orderByProperty: string,
                                        connectionArguments): string {
    const queryMatchPartial = `MATCH (e:${label})`;
    const queryVariableName = "e";
    return generateConnectionQuery(
        queryMatchPartial,
        queryVariableName,
        returnVariableName,
        orderByProperty,
        connectionArguments);
}

export function getConnectionCustomMatchQuery(queryMatchPartial: string,
                                              queryVariableName: string,
                                              returnVariableName: string,
                                              orderByProperty: string,
                                              connectionArguments): string {
    return generateConnectionQuery(
        queryMatchPartial,
        queryVariableName,
        returnVariableName,
        orderByProperty,
        connectionArguments);
}


function generateConnectionQuery(queryMatchPartial: string,
                                 queryVariableName: string,
                                 returnVariableName: string,
                                 orderByProperty: string,
                                 connectionArguments): string {
    const {first, last, before, after} = connectionArguments;

    const afterDecoded = after && base64.decode(after);
    const beforeDecoded = before && base64.decode(before);

    if (first && last) {
        throw "Fetching both first and last not yet supported.";
    }
    if (first || after) {
        return `
            ${queryMatchPartial}
            ${after ? `WHERE e.${orderByProperty} > "${decodeCursor(after)}"` : ""}
            RETURN ${queryVariableName} AS ${returnVariableName}
            ORDER BY ${queryVariableName}.${orderByProperty}
            ${first ? `LIMIT ${first + 1}` : ""}`;
    } else if (last || before) {
        if (last) {
            return `
                ${queryMatchPartial}
                ${before ? `WHERE ${queryVariableName}.${orderByProperty} < "${decodeCursor(before)}` : ""}
                WITH ${queryVariableName} AS e2
                ORDER BY e2.${orderByProperty} DESC
                LIMIT ${last + 1}
                WITH e2 AS e3
                RETURN e3 AS ${returnVariableName}
                ORDER BY e3.${orderByProperty}`;
        } else {
            // No last, just before
            return `
                ${queryMatchPartial}
                WHERE ${queryVariableName}.${orderByProperty} < "${beforeDecoded}"
                RETURN ${queryVariableName} AS ${returnVariableName}
                ORDER BY e3.${orderByProperty}`;
        }
    } else {
        return `
        ${queryMatchPartial}
        RETURN ${queryVariableName} AS ${returnVariableName}
        ORDER BY ${queryVariableName}.${orderByProperty}`
    }
}

