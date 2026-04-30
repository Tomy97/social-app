import { UserInterface } from "./user.interface";

export interface AuthStateInterface {
    isAuthenticated: boolean;
    user: UserInterface | null;
    loading: boolean;
    error: string | null;
}
