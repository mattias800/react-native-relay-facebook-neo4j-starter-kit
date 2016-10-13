import {fromGlobalId} from "graphql-relay";

export function getLocalId(globalId: string) {
    console.log("getLocalId");
    console.log(globalId);
    console.log(fromGlobalId(globalId));

    return fromGlobalId(globalId).id;
}