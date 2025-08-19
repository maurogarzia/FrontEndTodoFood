import { create } from "zustand";
import type { IProductsDetails } from "../types/IProductsDetails";
import type { IPromotionDetails } from "../types/IPromotionDetails";



interface IUseStoreCart {
    listProducts : (IProductsDetails | IPromotionDetails) []
    addProduct : (product : IProductsDetails | IPromotionDetails) => void
    deleteProduct : (product : IProductsDetails | IPromotionDetails) => void
    emptyCart: () => void
}

export const useStoreCart = create<IUseStoreCart>((set) => ({
    listProducts : [],

    addProduct: (product) => {
        set((state) => ({
            listProducts : [...state.listProducts, product]
        }))
    },

    deleteProduct : (product) => {
        set((state) => ({
            listProducts: state.listProducts.filter((p : any) => p.id !== product.id) 
        }))
    },

    emptyCart: () => set({listProducts : []})


}))
