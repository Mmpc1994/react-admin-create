import * as path from 'path';
import * as fs from 'fs';


import { log } from '../utils/log'
import { readFileToModel, modelToTable, modelToSearch } from '../utils/readFile';
import { toSearchFormJsx } from '../utils/toJsx';
import { writeFile } from '../utils/writeFile'


export function generateSearchForm(name: string, model: string, pathStr: string, options: any) {
    if (preCheck(name, model, pathStr)) {
        const MODEL_PATH = pathParse(model);
        const CURRENT_PATH = pathParse(pathStr);
        readFileToModel(MODEL_PATH).then(Model => {
            const columns = modelToTable(Model);
            const fields = modelToSearch(Model);
            toSearchFormJsx(fields).then(template => {
                writeFile(CURRENT_PATH, template)
            })
        })
    }
}

/**
 * 
 * @param name 
 * @param model 
 * @param path 
 * @param options 
 * 前置校验, 对命令行参数进行一些校验
 * 
 */
export function preCheck(name: string, model: string, path: string):boolean {
    let messages = []
    if (!name) messages.push('请输入文件名');
    if (!model) messages.push('请输入实体路径');
    if (!path) messages.push('请输入生成路径');
    if (messages.length) {
        log.warn(...messages);
        return false
    }
    return true
}

/**
 * 
 * @param pathStr
 * 解析出绝对路径
 */
export function pathParse(pathStr: string): string {
    const currentPath = process.cwd();

    return path.resolve(currentPath, pathStr);

}