import * as fs from 'fs';
import * as path from 'path';
import { DECORATORS_NAME } from '../constant';
import { IContentConstructor, IColumn, IField } from '../interface';
import { exec } from './exec'
import * as shelljs from 'shelljs'

// console.log(__dirname);
// console.log(process.cwd());
/**
 * 
 * @param pathStr 
 * 读取提供路径的文件
 * 然后将文件写到临时目录下
 * 之后将临时目录的实体类引入并且实例化
 */
export function readFileToModel(pathStr: string):Promise<IContentConstructor> {
    pathStr = path.resolve(pathStr)
    return new Promise((resolve, reject) => {
        fs.readFile(pathStr, 'utf-8', (err: Error, data: string) => {
            if (err) {
                reject(err)
            }
            data = injectDecorators() + data;
            fs.writeFile(path.resolve(__dirname, '../temp/model.ts'), data, (err: Error) => {
                if (err) {
                    reject(err)
                }

                // 要先对这个文件进行编译将.ts编译成.js
                // 返回的值是一个
                // {User: Function} 的结构, 这里就按照约定来了
                try {
                    loadModel().then(Model => {
                        resolve(Model)
                    })
                } catch (e) {
                    throw e
                }
            })
        })
    })
}

export function compileTsToJs():Promise<any> {
    return exec(`tsc ${path.resolve(__dirname, '../temp/model.ts')} --experimentalDecorators`)
}

/**
 * 判断是开发环境还是正式环境
 */
export function loadModel():Promise<IContentConstructor> {

    if (process.env.NODE_ENV === 'dev') {
        const ModelWrap = require(path.resolve(__dirname, '../temp/model.ts'));
        const key = Object.keys(ModelWrap)[0];
        if (key) {
            return Promise.resolve(ModelWrap[key]);
        } else {
            throw new Error('请定义正确的实体类');
        }
    } else {
        return compileTsToJs().then(res => {
            if (res === 'done') {
                const ModelWrap = require(path.resolve(__dirname, '../temp/model.js'));
                console.log(ModelWrap)
                const key = Object.keys(ModelWrap)[1];
                if (key) {
                    return Promise.resolve(ModelWrap[key]);
                }
                throw new Error('请定义正确的实体类');
            }
        })
    }
}

export function injectDecorators() {
    let names: string = ''
    DECORATORS_NAME.forEach(name => {
        if (names) {
            names = names + ', '
        }
        names = names + name
    })
    return `import {${names}} from '../decorators' \n`;
}

/**
 * 通过装饰器
 * 生成columns 用于生成react的table
 */
export function modelToTable(Model: IContentConstructor): IColumn[] {
    const model = new Model();
    const columns: IColumn[] = [];
    Object.keys(model).forEach(key => {
      if (Reflect.hasMetadata('columnName', model, key)) {
          const columnName = Reflect.getMetadata('columnName', model,key)
          columns.push({
              title: columnName,
              dataIndex: key,
              key
          })
      }
    })
    return columns
}

/**
 * 
 * @param Model 
 * 通过Search 装饰器获取相关配置
 * 
 */
export function modelToSearch(Model: IContentConstructor): IField[] {
    const model = new Model();
    const formItems: IField[] = [];
    Object.keys(model).forEach(key => {
        if (Reflect.hasMetadata('options', model, key)) {
            const options = Reflect.getMetadata('options', model,key)
            formItems.push({
                label: options.label,
                type: options.type,
                required: options.required,
                key: key,
            })
        }
    })
    return formItems
}
