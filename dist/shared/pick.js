"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObject = {};
    for (const element of keys) {
        if (obj && Object.hasOwnProperty.call(obj, element)) {
            finalObject[element] = obj[element];
        }
    }
    return finalObject;
};
exports.default = pick;
