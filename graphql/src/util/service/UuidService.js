var uuid = require('node-uuid');

export function generateUuid() {
    return uuid.v4();
}