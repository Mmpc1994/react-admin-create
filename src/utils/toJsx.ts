import { IField, IColumn } from './../interface';
import { toInput, toSelect } from './formBuilder'

/**
 * 
 * @param fields 
 * 生成文件的头部部分
 * 如导入必要的组件
 */
export function toAheadImport(componentsName: string[]): Promise<string> {
    let template = `
        import react from 'react'; \n
        import withRouter from 'umi/withRouter'; \n
        import ${ componentsName } from 'antd'; \n

    `
    return Promise.resolve(template)
}

/**
 * 对一些特殊的组件做处理
 * 如导入了Form组件 需要从中取得FormItem
 */
export function toComponentChild(componentsName: string[], template: string): Promise<string> {
    if (componentsName.includes('Form')) {
        template += `
            const FormItem = Form.item; \n
        `
    }
    if (componentsName.includes('Select')) {
        template += `
            const { Option } = Select;
        `
    }
    
    return Promise.resolve(template)

}

export function toReactComponent(name: string, template: string): Promise<string> {
    template += `
        export class ${name}Component extends React.Component { \n
            constuctor() { \n
                super(); \n
                this.state = {}; \n
            }

    `

    return Promise.resolve(template)
}


export function toTableJsx(columns: IColumn[], template: string) {
    let components = [];
}

export function toSearchFormJsx(fields: IField[], name: string = 'test'): Promise<string> {
    const components: string[] = []
    fields.forEach(field => {
        if (components.includes(field.type)) return
        components.push(field.type)
    });
    return toAheadImport(components).then(template => {
        return toComponentChild(components, template).then(template => {
            return toReactComponent(name, template).then(template => {
                return toSearchFormRenderJsx(fields, template);
            })
        })
    })

}

export function toSearchFormRenderJsx(fields: IField[], template: string): string {
    let FormItemTemplate = '';
    fields.forEach(field => {
        switch (field.type) {
            case 'Input': 
                FormItemTemplate = toInput(field);
                break;
            case 'Select':
                FormItemTemplate = toSelect(field);
                break
        }
    });
    
    template += `
        render() {
            const { getFieldDecorator } = this.props.form; \n
            return ( \n
                <Form layout="inline" className="search-form"> \n
                    ${FormItemTemplate}

                    <FormItem className="search-buttons"> \n 
                        <Button type='primary' onClick={this.handleSearch}>查询</Button> \n
                        <Button onClick={this.handleExport}  style={{marginLeft: 20}}> \n
                            <Icon type="upload" />批量导出 \n
                        </Button> \n
                    </FormItem> \n
                </Form> \n
            )
        }
    `;
    return template
}