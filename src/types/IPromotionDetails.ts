import type { IPrice } from "./IPrice";
import type { IProductsDetails } from "./IProductsDetails";
import type { IPromotion } from "./IPromotion";

export interface IPromotionDetails {
    id: number
    discount : number,
    promotion : IPromotion,
    price : IPrice,
    details: IProductsDetails[]
}

export interface IRequestPromotionDetails{
    id : number | null
    discount : number,
    promotion : {id : number | null},
    price : {id : number | null},
}