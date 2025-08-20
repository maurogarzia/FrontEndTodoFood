import type { IProductsDetails } from "./IProductsDetails";
import type { IPromotionDetails } from "./IPromotionDetails";

export interface ICart {
    quantity: number,
    price: number,
    type: 'promotion' | 'product'
    detail: IProductsDetails | IPromotionDetails | null
}