export interface TableProjectsEvents {
    id: string;
    action: TableProjectsActions;
}

export type TableProjectsActions = 'detail' | 'edit' | 'delete';