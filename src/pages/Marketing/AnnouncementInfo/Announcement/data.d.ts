export type TableListItem = {
    id: string;
    type: string;
    title: string;
    isRecommend: string;
    isShow: string;
    urladdress: string;
    author: string;
    releaseDate: string;
};

export type TableListParams = {
    type?: string;
    title?: string;
    key?: string;
    pageSize?: number;
    currentPage?: number;
};
