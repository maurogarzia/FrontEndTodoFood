import type { IImage } from "./IImage"
import type { IProducts } from "./IProducts"
import type { ISize } from "./ISize"

export interface IProductsDetails{
    id: number,
    stock: number,
    price: number,
    size: ISize,
    image: IImage
    product : IProducts
}

export interface IRequestProductsDetails {
    id?: number | null,
    stock: number,
    price: number,
    size: {id: number | null},
    image: {id: number | null}
    product : {id : number | null}
}