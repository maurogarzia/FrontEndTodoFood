import type { Rol } from "./enums/Rol";

export interface IRegister {
    name: string
    lastname: string
    username: string
    password: string
    role: Rol | null;
    email: string
}

export interface ILogin{
    username : string,
    password : string
}