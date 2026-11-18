export interface Project {
    id: string;
    titulo: string;
    descripcion: string;
    asignatura: string;
    url: string;
    publicado: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;