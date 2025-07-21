import type { IProductsDetails } from "./IProductsDetails";

export interface IUnitaryDetails {
    id: number
    quantity : number,
    productsDetails : IProductsDetails
}


export interface IRequestUnitaryDetails {
    number :  number | null
    quantity : number,
    productsDetails : {id : number}
}