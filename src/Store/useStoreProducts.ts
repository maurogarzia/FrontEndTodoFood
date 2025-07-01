import { create } from "zustand";
import type { IProducts } from "../types/IProducts";
import { getAllProducts } from "../cruds/crudProducts";

interface IUseStoreProducts {
    products : IProducts[]
    activeProduct: IProducts | null
    setActiveProduct : (incommingProduct : IProducts | null) => void,
    fetchProduct : () => Promise<void>
}

export const useStoreAddress = create<IUseStoreProducts>((set) => ({
    products : [],
    activeProduct: null,

    setActiveProduct : (incommingProduct : IProducts | null) => set({activeProduct: incommingProduct}),

    fetchProduct: async() => {
        const fetchedProduct = await getAllProducts()
        if (fetchedProduct) {
            set({products : fetchedProduct})
        } else {
            set({products : []})
        }
        
    }

}))