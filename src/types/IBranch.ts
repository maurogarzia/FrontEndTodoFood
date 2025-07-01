import type { IAddress } from "./IAddress";

export interface IBranch {
    id: number,
    address : IAddress
}

export interface IRequestBranch {
    id: number,
    address : {id: number}
}