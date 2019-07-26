import { IField } from './../interface';

export function toInput(field: IField): string {
    return `
        <FormItem label={${field.label}} className='search-form'> \n
            { \n
                getFieldDecorator('${field.key}', { \n
                    initialValue: '', \n
                    required: ${field.required} \n
                }) ( \n
                    <Input placeholder={${field.placeholder}} /> \n
                ) \n

            }
        </FormItem> \n
    `
}

export function toSelect(field: IField): string {
    return `
        <FormItem label={${field.label}} className='search-form'> \n
            { \n
                getFieldDecorator('${field.key}', { \n
                    initialValue: '', \n
                    required: ${field.required} \n
                }) ( \n
                    <Select placeholder={${field.placeholder}} > \n
                        <Option value=''>请选择</Option>
                    </Select>
                ) \n
            }
        </FormItem> \n
    `
}