
        import React from 'react'; 
        import withRouter from 'umi/withRouter'; 
        import Input from 'antd'; 

    
        export class testComponent extends React.Component { 
            constuctor() { 
                super(); 
                this.state = {}; 
            }

    
            handleSearch = () => {
                const searchInfo = this.props.form.getFieldsValue();
                this.props.search(searchInfo)
            }

            handleOutput = () => {
                const searchInfo = this.props.form.getFieldsValue();
                this.props.output(searchInfo);
            }
    
            render() {
                const { getFieldDecorator } = this.props.form; 
                return ( 
                    <Form layout="inline" className="search-form"> 
                        <FormItem label={手机号} className='search-form'>
                            {
                                getFieldDecorator('phone', {
                                    initialValue: '',
                                    required: undefined
                                }) (
                                    <Input placeholder={undefined} />
                                )

                            }
                        </FormItem>
    

                        <FormItem className="search-buttons">  
                            <Button type='primary' onClick={this.handleSearch}>查询</Button> 
                            <Button onClick={this.handleExport}  style={{marginLeft: 20}}> 
                                <Icon type="upload" />批量导出 
                            </Button> 
                        </FormItem> 
                    </Form> 
                )
            }
    