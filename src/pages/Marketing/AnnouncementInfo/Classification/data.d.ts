export type TableListItem = {
    key: number;
    articleName: string;
    desc: string;
    sortLevel: string;
    parentTypeName: string;
    sort: string;
    isShow: string;
    keywords: string;
};

export type TableListParams = {
    name?: string;
    desc?: string;
    pageSize?: number;
    currentPage?: number;
};
