import chalk, {ColorSupport, Chalk} from 'chalk';
import * as moment from 'moment';

export class Log {
    info(...args: string[]) {
        const type = 'Info';
        
    }

    warn(...args: string[]) {
        const type = 'Warn';
    }

    private __base(color: any, type: string,  ...args: string[]) {
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

export const log = new Log();