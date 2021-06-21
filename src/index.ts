#!/usr/bin/env node
import program from 'commander';
import chalk from 'chalk';
import {init} from './init';

// 执行 -V 会输出版本号
program.version('1.0.0');

// 添加命令
program
  .arguments('<project-name>')
  .usage(`${chalk.green('<project-name>')}`)
  .option('--use-exact', 'use exact in npm or yarn (in yarn is \'--exact\', in npm is \'--save-exact\')')
  .action(init);

// 解析命令行参数
program.parse(process.argv);
