import { IField } from './../interface';

export function toInput(field: IField): string {
    return `
                        <FormItem label={${field.label}} className='search-form'>
                            {
                                getFieldDecorator('${field.key}', {
                                    initialValue: '',
                                    required: ${field.required}
                                }) (
                                    <Input placeholder={${field.placeholder}} />
                                )

                            }
                        </FormItem>
    `
}

export function toSelect(field: IField): string {
    return `
                        <FormItem label={${field.label}} className='search-form'>
                            {
                                getFieldDecorator('${field.key}', {
                                    initialValue: '',
                                    required: ${field.required}
                                }) (
                                    <Select placeholder={${field.placeholder}} >
                                        <Option value=''>请选择</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
    `
}
