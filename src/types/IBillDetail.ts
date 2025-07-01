
import type { IBill } from "./IBill"
import type { IProducts } from "./IProducts"


export interface IBIllDetail{
    id?: number
    product: IProducts
    quantity: number
    unitPrice: number
    subtotal: number
    discount?: number
    bill?: IBill
}