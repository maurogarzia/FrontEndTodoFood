
import type { Rol } from "./enums/Rol"
import type { IAddress } from "./IAddress"

export interface IUser {
    id: number,
    name: string
    password: string,
    rol: Rol,
    email: string,
    dni: number,
    address: IAddress
}

export interface IRequestUser {
    id?: number,
    name: string
    password: string,
    rol: Rol,
    email: string,
    dni: number,
    address: {id: number}
}