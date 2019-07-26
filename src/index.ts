import { readFileToModel, modelToTable } from './utils/readFile'
import 'reflect-metadata'


readFileToModel('./model/user.js').then(Model => {
    console.log(new Model);
    modelToTable(Model)
})