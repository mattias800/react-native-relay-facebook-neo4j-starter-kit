/* @flow */

export function isSameEntity(o1: Object, o2: Object): boolean {
    return o1.__dataID__ === o2.__dataID__;
}