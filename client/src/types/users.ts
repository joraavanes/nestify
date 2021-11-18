export interface User {
    _id: string;
    email: string;
    name: string;
    surname: string;
    lastLogin: string;
    userConfirmed: boolean;
}

export interface GetUsersData {
    users: User[];
    loading: boolean;
    error: Error;
}