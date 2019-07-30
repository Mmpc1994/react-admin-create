#!/usr/bin/env node

import * as program from 'commander';
import { generateSearchForm } from '../src/action/generate';

process.env.NODE_ENV = 'pro';



/**
 * name  生成的文件名
 * model 实体定义的路径
 * path  生成文件的路径
 * 
 * 
 */

(function() {
    program
    .command('generate [name] [model] [path]')
    .alias('g')
    .description('生成一些简单的文件')
    .option('-s --search', '生成Search Form 相关文件')
    .option('-t --table', '生成Table相关文件')
    .option('-f --form', '生成Form相关文件')
    .action((name, model, path, options) => {
        generateSearchForm(name, model, path, options)
    })

    program.parse(process.argv)

})()
