"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(names, path) {
    const files = names.split(',').filter(val => val.length > 0);
    files.forEach(name => {
        fs_extra_1.default.mkdirSync(`${path}\\src\\${name.trim()}`);
    });
}
exports.default = default_1;
