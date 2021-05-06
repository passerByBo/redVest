export type TableListItem = {
    id: string;
    billno: string;
    mealName: string;
    mealId: string;
    isrelease: string;
    applyman: string;
    applyDate: string;
    mealstatus: string;
    status: string;
    startDate: string;
    endDate: string;
};

export type TableListParams = {
    articleName?: string;
    desc?: string;
    key?: string;
    pageSize?: number;
    currentPage?: number;
};
