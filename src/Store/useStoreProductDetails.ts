import { create } from "zustand";
import type { IProductsDetails } from "../types/IProductsDetails";
import { getAllProductsDetails } from "../cruds/crudProductDetails";

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
        const fetchedProductDetails = await getAllProductsDetails()
        if (fetchedProductDetails) {
            set({productDetails : fetchedProductDetails})
        } else {
            set({productDetails : []})
        }
        
    }

}))