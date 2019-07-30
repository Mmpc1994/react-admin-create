import * as shelljs from 'shelljs'

export function exec(cmd: string):Promise<string> {
    return new Promise((resolve, reject) => {
        const shell = shelljs.exec(cmd);
        if (shell.code === 0) {
            resolve('done');
          } else {
            console.log(shell)
            reject();
          }
    })
}
 