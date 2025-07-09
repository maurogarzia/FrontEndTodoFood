import type { IImage } from "./IImage"
import type { IPrice } from "./IPrice"
import type { IProductsDetails } from "./IProductsDetails"

export interface IPromotion {
    id: number,
    name: string
    initDate: Date,
    finallyDate: Date,
    description: string,
    discount: number
    price: IPrice,
    products: IProductsDetails[],
    image: IImage
}

export interface IRequestPromotion {
    id?: number | null
    name : string,
    initDate: Date,
    finallyDate: Date,
    description: string,
    discount: number
    price: {id: number | null},
    productsDetails: {id : number | null}[],
    image: {id: number | null}
}