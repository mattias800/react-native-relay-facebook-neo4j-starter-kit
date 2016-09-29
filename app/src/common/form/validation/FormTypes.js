const t = require('tcomb-form-native');

const emailValidationRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const PositiveNumber = t.refinement(t.Number, function (n) {
    return n >= 0;
});

export const Email = t.refinement(t.String, function (email) {
    return emailValidationRegex.test(email);
});