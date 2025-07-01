import { create } from "zustand";
import type { IProductsDetails } from "../types/IProductsDetails";
import { getAllProductsDetails } from "../cruds/crudProductDetails";

interface IUseStoreProductsDetails {
    productsDetails : IProductsDetails[]
    activeProductDetails: IProductsDetails | null
    setActiveProductDetails : (incommingProductDetails : IProductsDetails | null) => void,
    fetchProductDetails : () => Promise<void>
}

export const useStoreAddress = create<IUseStoreProductsDetails>((set) => ({
    productsDetails : [],
    activeProductDetails: null,

    setActiveProductDetails : (incommingProductDetails : IProductsDetails | null) => set({activeProductDetails: incommingProductDetails}),

    fetchProductDetails: async() => {
        const fetchedProductDetails = await getAllProductsDetails()
        if (fetchedProductDetails) {
            set({productsDetails : fetchedProductDetails})
        } else {
            set({productsDetails : []})
        }
        
    }

}))