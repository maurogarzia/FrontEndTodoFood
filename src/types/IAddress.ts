import type { ILocality } from "./ILocality";

export interface IAddress {
    id: number,
    street : string,
    number: number,
    locality: ILocality
}

export interface IRequestAddress {
    id? : number | null,
    street: string,
    number: number,
    locality: {id: number | null}
}