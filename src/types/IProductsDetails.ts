import type { IImage } from "./IImage"
import type { IPrice } from "./IPrice"
import type { IProducts } from "./IProducts"
import type { ISize } from "./ISize"

export interface IProductsDetails{
    id: number,
    stock: number,
    price: IPrice,
    size: ISize,
    image: IImage
    product : IProducts
}

export interface IRequestProductsDetails {
    id?: number | null,
    stock: number,
    price: {id: number | null},
    size: {id: number | null},
    image: {id: number | null}
    product : {id : number | null}
}