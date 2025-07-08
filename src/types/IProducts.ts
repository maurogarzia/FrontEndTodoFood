import type { ICategory } from "./ICategory";

export interface IProducts {
    id: number,
    name: string,
    category: ICategory,
    
}

export interface IRequestProducts {
    id?: number | null,
    name: string,
    category: {id: number | null},
}