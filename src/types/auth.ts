import type { Rol } from "./enums/Rol";

export interface IRegister {
    name: string
    lastName: string
    userName: string
    password: string
    role: Rol | null;
    email: string
}

export interface ILogin{
    userName : string,
    password : string
}