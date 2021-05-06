export type TableListItem = {
    id: string;
    billno: string;
    cardName: string;
    useType: string;
    cardMoney: string;
    totalMoneyLower: string;
    cardStatus: string;
    status: string;
    startDate: string;
    endDate: string;
    applyman: string;
    applyDate: string;
};

export type TableListParams = {
    articleName?: string;
    desc?: string;
    key?: string;
    pageSize?: number;
    currentPage?: number;
};
