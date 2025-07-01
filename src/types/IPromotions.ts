import type { IPromotionsDetails } from "./IPromotionsDetails"

export interface IPromotions {
    id: number,
    name: string,
    promotionDetails: IPromotionsDetails
}

export interface IRequestPromotions {
    id?: number,
    name: string,
    promotionDetails: {id: number}
}