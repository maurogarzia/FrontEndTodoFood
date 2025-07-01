import type { IImage } from "./IImage"
import type { IPrice } from "./IPrice"
import type { ISize } from "./ISize"

export interface IProductsDetails{
    id: number,
    stock: number,
    price: IPrice,
    size: ISize,
    image: IImage
}

export interface IRequestProductsDetails {
    id?: number,
    stock: number,
    price: {id: number},
    size: {id: number},
    image: {id: number}
}