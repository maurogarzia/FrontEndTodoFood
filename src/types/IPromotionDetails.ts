import type { IPromotion } from "./IPromotion";
import type { IUnitaryDetails } from "./IUnitaryDetails";

export interface IPromotionDetails {
    id: number
    discount : number,
    promotion : IPromotion,
    price : number,
    details: IUnitaryDetails[]
}

export interface IRequestPromotionDetails{
    id : number | null
    discount : number,
    promotion : {id : number | null},
    price : number,
    details : {id : number | null}[]
}