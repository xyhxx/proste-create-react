"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(name, fileName) {
    return fs_extra_1.default.readFileSync(`${name}\\${fileName}`, { encoding: 'utf8' });
}
exports.default = default_1;
