
import type { Rol } from "./enums/Rol"
import type { IAddress } from "./IAddress"

export interface IUser {
    id: number,
    name: string,
    lastname : string
    password: string,
    role: Rol,
    email: string,
    address: IAddress,
    username : string
    phone : number
}

export interface IRequestUser {
    id?: number | null,
    name: string
    lastname : string
    password: string,
    role: Rol | null,
    email: string,
    address: {id: number | null} | null,
    username : string
    phone : number 
}

export interface IPatchUser{
    id ? : number 
    name : string,
    lastname : string,
    phone : string,
    email : string,
    address : {id : number | null} | null
    username : string
    role : Rol
}