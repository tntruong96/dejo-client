

interface Info {
    userName: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface ILogin {
    userName: string;
    password: string;
}

export interface IRegister extends Info {
    password: string;
    passwordConfirm: string;
}

export interface UserProfile extends Info{
    role: string
    id: number;
}

export enum ROLE {
    ADMIN= 'admin',
    USER='user'
}