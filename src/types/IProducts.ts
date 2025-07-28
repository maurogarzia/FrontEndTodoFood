import type { ICategory } from "./ICategory";
import type { IImage } from "./IImage";

export interface IProducts {
    id: number,
    name: string,
    category: ICategory,
    description : string,
    image : IImage
}

export interface IRequestProducts {
    id?: number | null,
    name: string,
    category: {id: number | null},
    image : {id: number | null}
    description : string
}