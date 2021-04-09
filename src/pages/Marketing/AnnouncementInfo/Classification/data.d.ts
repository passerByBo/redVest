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
    pageSize?: number;
    currentPage?: number;
};
