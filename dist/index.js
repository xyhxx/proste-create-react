#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const chalk_1 = __importDefault(require("chalk"));
const init_1 = require("./init");
// 执行 -V 会输出版本号
commander_1.default.version('1.0.0');
// 添加命令
commander_1.default
    .arguments('<project-name>')
    .usage(`${chalk_1.default.green('<project-name>')}`)
    .action(init_1.init);
// 解析命令行参数
commander_1.default.parse(process.argv);
