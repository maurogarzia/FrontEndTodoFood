import type { IProvince } from "./IProvince";

export interface ILocality {
    id: number,
    name: string,
    cp: number,
    province: IProvince

}

export interface IRequestLocality {
    id? : number,
    name: string,
    cp: number,
    province: {id: number}
}