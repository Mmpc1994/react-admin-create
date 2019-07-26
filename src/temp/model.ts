import {Column, Search} from '../decorators' 
export class User {
    id = '';

    @Column('用户姓名')
    @Search({
        type: 'Input',
        label: '用户姓名',
        placeholder: '请输入用户姓名'
    })
    name = '';


    @Column('手机号')
    @Search({
        type: 'Input',
        label: '手机号',
        placeholder: '请输入手机号'
    })
    phone = ''
}