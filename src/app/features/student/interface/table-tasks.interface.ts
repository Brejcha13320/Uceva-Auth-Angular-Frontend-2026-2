export interface TableTasksEvents {
    id: string;
    action: TableTasksActions;
}

export type TableTasksActions = 'detail' | 'edit' | 'delete';