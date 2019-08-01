import { log } from './log'


/**
 * 
 * @param path 
 * 
 * 解析 /test/test.js 或者 /test/test 
 * 路径的最后一个slash 是文件名
 */

 

export function pathToComponentName(path: string): string {
    if (!path) {
        log.warn('生成路径不正确!!!');
        return
    }
    
    let pathArrs  =  path.split('/'),
        lastSlash = pathArrs[pathArrs.length - 1];
    
    return lastSlash.split('.')[0];
}