export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    created_at?: Date;
}
type Role = 'user' | 'admin';
