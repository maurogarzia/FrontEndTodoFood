import type { IImage } from "./IImage"
import type { IPrice } from "./IPrice"
import type { IProducts } from "./IProducts"

export interface IPromotionsDetails {
    id: number
    initDate: Date,
    finallyDate: Date,
    description: string,
    discount: number
    price: IPrice,
    products: IProducts[],
    image: IImage
}

export interface IRequestPromotionsDetails {
    id?: number
    initDate: Date,
    finallyDate: Date,
    description: string,
    discount: number
    price: {id: number},
    product: {ids: number[]},
    image: {id: number}
}