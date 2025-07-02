import { create } from "zustand";
import { getAllProducts } from "../cruds/crudProducts";
import type { IProductsDetails } from "../types/IProductsDetails";

interface IUseStoreProductsDetails {
    productDetails : IProductsDetails[]
    activeProductDetails: IProductsDetails | null
    setActiveProductDetails : (incommingProductDetails : IProductsDetails | null) => void,
    fetchProductDetails : () => Promise<void>
}

export const useStoreProductDetails = create<IUseStoreProductsDetails>((set) => ({
    productDetails : [],
    activeProductDetails: null,

    setActiveProductDetails : (incommingProductDetails) => set({activeProductDetails: incommingProductDetails}),

    fetchProductDetails: async() => {
        const fetchedProductDetails = await getAllProducts()
        if (fetchedProductDetails) {
            set({productDetails : fetchedProductDetails})
        } else {
            set({productDetails : []})
        }
        
    }

}))