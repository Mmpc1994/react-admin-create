export interface IFieldType {
    label: string,
    // 描述表单的类型如 input select 等
    type: string,

    placeholder?: string,

    
}

export interface IField {
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean
    key?: string;
}