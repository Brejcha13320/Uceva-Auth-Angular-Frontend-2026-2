export interface Task {
    id: string;
    titulo: string;
    descripcion: string;
    prioridad: string;
    estado: StateTask;
    createdAt: Date;
    updatedAt: Date;
}

export type StateTask = 'COMPLETADA' | 'PROCESO' | 'PENDIENTE';

export type CreateTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;