import { IField, IColumn } from './../interface';
import { toInput, toSelect } from './formBuilder'

/**
 * 
 * @param fields 
 * 生成文件的头部部分
 * 如导入必要的组件
 */
export function toAheadImport(componentsName: string[]): string {
    let template = `
        import react from 'react'; \n
        import withRouter from 'umi/withRouter'; \n
        import ${ componentsName } from 'antd'; \n

    `
    return template
}

/**
 * 对一些特殊的组件做处理
 * 如导入了Form组件 需要从中取得FormItem
 */
export function toComponentChild(componentsName: string[], template: string):string {
    if (componentsName.includes('Form')) {
        template += `
            \n
            \n
            const FormItem = Form.item; \n
        `
    }
    if (componentsName.includes('Select')) {
        template += `
            const { Option } = Select;
        `
    }
    
    return template

}

export function toReactComponent(name: string, template: string): string {
    template += `
        \n
        \n
        export class ${name}Component extends React.Component { \n
            constuctor() { \n
                super(); \n
                this.state = {}; \n
            }

    `

    return template
}

export function toReactComponentEnd(template: string): string {
    template += `
        \n

    `
    return template
}

export function toTableJsx(columns: IColumn[], template: string) {

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