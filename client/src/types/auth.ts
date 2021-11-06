export interface LoginData {
    result: string;
    loading: boolean;
    error: Error;
}

export interface LoginVariables{
    username: string;
    password: string;
}