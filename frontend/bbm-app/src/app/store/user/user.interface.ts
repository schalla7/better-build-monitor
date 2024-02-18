export interface IUser {
    id: number;
    username: string;
    isAuthenticated: boolean;
    permissions: string[];    
}