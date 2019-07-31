import * as fs from 'fs';



/**
 * 
 * @param path 
 * @param template 
 * 
 * 根据生成的template 生成文件
 */
export function writeFile(path: string, template: string) {
    fs.open(path, 'w+', (err, fd) => {
        if (err) {
            throw err
        }
        fs.writeFile(path, template, (err) => {
            console.log(err);
        });
    });
}