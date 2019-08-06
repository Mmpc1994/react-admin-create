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
        import react from 'react'; 
        import withRouter from 'umi/withRouter'; 
        import ${ componentsName } from 'antd'; 

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
            const FormItem = Form.item; 
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
        export class ${name}Component extends React.Component { 
            constuctor() { 
                super(); 
                this.state = {}; 
            }

    `

    return Promise.resolve(template)
}

export function toSearchEventHandle(template: string): Promise<string> {
    template += `
            handleSearch = () => {
                const searchInfo = this.props.form.getFieldsValue();
                this.props.search(searchInfo);
            }

            handleOutput = () => {
                const searchInfo = this.props.form.getFieldsValue();
                this.props.output(searchInfo);
            }
    `
    return Promise.resolve(template);
}

export function toTableEventHandle(template: string): Promise<string> {
    template += `
            handleAdd = () => {
                this.setState({
                    isShowAdd: true
                })
            }

            onSearch = (searchInfo = {}) => {

            }

            submit = () => {

            }

            handleDelete = () => {

            }

            handleEdit = () => {
                
            }
    `

    return Promise.resolve(template);
}


export function toTableJsx(columns: IColumn[], name: string = 'test') {
    let components = ['Card', 'Button', 'Table', 'Modal', 'Popconfirm'];
    return toAheadImport(components).then(template => {
        return toReactComponent(name, template)
    })
}

export function toSearchFormJsx(fields: IField[], name: string = 'test'): Promise<string> {
    const components: string[] = []
    fields.forEach(field => {
        if (components.includes(field.type)) return;
        components.push(field.type);
    });
    return toAheadImport(components).then(template => {
        return toComponentChild(components, template).then(template => {
            return toReactComponent(name, template).then(template => {
                return toSearchEventHandle(template).then(template => {
                    return toSearchFormRenderJsx(fields, template);
                });
            })
        })
    })

}

export function toTableRenderJsx(columnsOption: IColumn[], template: string) :string {
    columnsOption.push({
        title: '操作',
        dataIndex: 'opt',
        key: 'opt',
        fixed: 'right',
        render: `(text: string, row: any, index: number) => {
            return (
                
                    <div>
                        <Button size="small" onClick={() => { this.handleEdit(text, row) }}>编辑</Button>

                        <Popconfirm
                            title="确定删除？"
                            onConfirm={()=> this.handleDelete(row, index)}>
                            <Button size="small" style={{marginLeft: 10, color: 'red'}}>删除</Button>
                        </Popconfirm>
                    </div>
            )
        }`
    })
    template += `
            render()  {
                let columns  = [${columnsOption.map(column => {
                    let _fixedTemplate  = column.fixed ? `fixed: ${column.fixed},` : '';
                    let _renderTemplate = column.render ? `render: ${column.render}` : ''
                    return `{
                        title: ${column.title},
                        dataIntex: ${column.dataIndex},
                        key: ${column.key},
                        ${_fixedTemplate}
                        ${_renderTemplate}
                    }`
                })}];
                
                columns = columns.map(item => ({
                    ...item, 
                    align: 'center'
                }));

                return (
                    <div>
                        <Card style={{marginBottom: -1, textAlign: 'right'}}>
                            <Button type="primary" onClick={() => {
                                this.handleAdd()
                            }}>添加</Button>
                        </Card>

                        <div className="content-wrap">
                            <Table
                                rowKey='id'
                                bordered
                                columns={columns}
                                dataSource={this.state.dataSource}
                                onChange={this.onSearch}
                                pagination={this.params}
                                scroll={{ x: 'max-content'}}
                            />
                        </div>

                        {
                            this.state.isShowAdd && 
                            <Modal
                                title="新增用车差标"
                                visible={this.state.isShowAdd}
                                width={680}
                                onOk={() => this.submit()}
                                onCancel={() => {
                                    this.setState({
                                        isShowAdd: false
                                    })
                            }}>
                            </Modal>
                        }
                    </div>
                )
            }
    `
    return template
    
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
    // 最后一个大括号是为了闭合 toReactComponent 这个方法没有闭合的
    template += `
            render() {
                const { getFieldDecorator } = this.props.form; 
                return ( 
                    <Form layout="inline" className="search-form"> 
                        ${FormItemTemplate}

                        <FormItem className="search-buttons">  
                            <Button type='primary' onClick={this.handleSearch}>查询</Button> 
                            <Button onClick={this.handleExport}  style={{marginLeft: 20}}> 
                                <Icon type="upload" />批量导出 
                            </Button> 
                        </FormItem> 
                    </Form> 
                )
            }
        }
    `;
    return template;
}