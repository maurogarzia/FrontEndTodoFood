import type { ICountry } from "./ICountry"

export interface IProvince{
    id: number
    name: string
    country: ICountry

}

export interface IRequestProvince{
    id?: number
    name: string
    country: {id : number}
}