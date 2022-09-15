export interface iIncident {
    category: string;
    priorty: string;
    title: string;
    callerPhone: string;
    callerName: string;
    status: number;
    assignTo?: string;
    description: string;
    replay?: string;
}