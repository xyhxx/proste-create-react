"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTailwindCss = exports.installPlugin = exports.createFolders = exports.installCraco = void 0;
var craco_1 = require("./craco");
Object.defineProperty(exports, "installCraco", { enumerable: true, get: function () { return __importDefault(craco_1).default; } });
var folders_1 = require("./folders");
Object.defineProperty(exports, "createFolders", { enumerable: true, get: function () { return __importDefault(folders_1).default; } });
var plugins_1 = require("./plugins");
Object.defineProperty(exports, "installPlugin", { enumerable: true, get: function () { return __importDefault(plugins_1).default; } });
var tailwind_1 = require("./tailwind");
Object.defineProperty(exports, "initTailwindCss", { enumerable: true, get: function () { return __importDefault(tailwind_1).default; } });
