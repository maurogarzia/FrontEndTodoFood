import type { IProductsDetails } from "./IProductsDetails";

export interface IUnitaryDetails {
    id: number
    quantity : number,
    productDetails : IProductsDetails
}


export interface IRequestUnitaryDetails {
    id :  number | null
    quantity : number,
    productDetails : {id : number | null}
}