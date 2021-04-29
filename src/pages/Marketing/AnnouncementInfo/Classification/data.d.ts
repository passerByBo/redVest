export type TableListItem = {
    id: string;
    type: string;
    journalismDescribe: string;
    typeLevel: string;
    parentType: string;
    sort: string;
    isRecommend: string;
    keyword: string;
};

export type TableListParams = {
    articleName?: string;
    desc?: string;
    key?: string;
    pageSize?: number;
    currentPage?: number;
};
