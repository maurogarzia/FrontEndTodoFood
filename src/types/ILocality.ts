import type { IProvince } from "./IProvince";

export interface ILocality {
    id: number,
    name: string,
    cp: number,
    province: IProvince

}

export interface IRequestLocality {
    id? : number | null,
    name: string,
    cp: number,
    province: {id: number | null}
}