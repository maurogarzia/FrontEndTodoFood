import type { IAddress } from "./IAddress";

export interface IBranch {
    id: number,
    name: string,
    address : IAddress
    number : number
}

export interface IRequestBranch {
    id: number | null,
    name : string,
    address : {id: number | null},
    number : number
}