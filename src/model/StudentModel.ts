export interface Student {
    id?: number;
    name: string;
    email: string;
    password?: string; // Optionnel lors du renvoi au client
}