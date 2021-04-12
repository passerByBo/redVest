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
    articleName?: string;
    desc?: string;
    key?: number;
    pageSize?: number;
    currentPage?: number;
};
