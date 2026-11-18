export interface User {
    id: string;
    nombre: string;
    email: string;
    rol: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'ESTUDIANTE' | 'DOCENTE' | 'ADMIN';