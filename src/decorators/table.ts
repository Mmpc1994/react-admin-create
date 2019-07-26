/**
 *  生成table相关的页面
 *  包含头部的search 
 *  以及table, 分页栏等
 */


import 'reflect-metadata'
import { IFieldType } from './../interface/fields-type';

export function Column(columnName: string) {
    return function(target: any, name: string) {
        Reflect.defineMetadata('columnName', columnName, target, name)
    }
}

export function Search(options: IFieldType) {
    return function(target: any, name: string) {
        Reflect.defineMetadata('options', options, target, name)
    }
}