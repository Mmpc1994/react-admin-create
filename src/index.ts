import { readFileToModel, modelToTable, modelToSearch } from './utils/readFile'
import { toSearchFormJsx } from './utils/toJsx';
import 'reflect-metadata'


readFileToModel('./model/user.js').then(Model => {
    console.log(new Model);
    const columns = modelToTable(Model);
    const fields = modelToSearch(Model);
    toSearchFormJsx(fields).then(template => {
        console.log(template);
    })
})