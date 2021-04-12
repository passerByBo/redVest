export type TableListItem = {
    key: number;
    articleName: string;
    articleTitle: string;
    articleLevel: string;
    outerLink: string;
    author: string;
    isShow: string;
    releaseTime: string;
};

export type TableListParams = {
    articleName?: string;
    articleTitle?: string;
    key?: number;
    pageSize?: number;
    currentPage?: number;
};
