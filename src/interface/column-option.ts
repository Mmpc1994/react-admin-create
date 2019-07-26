export interface IColumnOption {
    label: string // 用于生成table的列名
}

export interface IColumn {
    title: string;
    dataIndex: string;
    key: string;
    render?: Function;
    fixed?: boolean
}