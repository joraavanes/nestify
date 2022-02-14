
export interface authState {
    token?: string;
    access?: string;
}

export interface LoginData {
    login:{ 
        result: string,
        description: string,
        token: string,
    };
    loading: boolean;
    error: Error;
}

export interface LoginVariables{
    username: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    userConfirmed: boolean;
    lastLogin?: number;
    name: string;
    surname: string;
}

export interface RegisterVariables{
    email: string;
    password: string;
    userConfirmed?: boolean;
    name: string;
    surname: string;
}