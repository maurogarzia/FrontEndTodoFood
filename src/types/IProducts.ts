import type { ICategory } from "./ICategory";
import type { IProductsDetails } from "./IProductsDetails";

export interface IProducts {
    id: number,
    name: string,
    category: ICategory,
    details: IProductsDetails,
}

export interface IRequestProducts {
    id?: number,
    name: string,
    category: {id: number},
    details: {id: number}
}