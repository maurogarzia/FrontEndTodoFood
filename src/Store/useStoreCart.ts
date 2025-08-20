import { create } from "zustand";
import type { ICart } from "../types/ICart";



interface IUseStoreCart {
    listCart : ICart [],
    addProduct : (product : ICart ) => void
    deleteProduct : (product : ICart) => void
    emptyCart: () => void
}

export const useStoreCart = create<IUseStoreCart>((set) => ({
    
    listCart : [],

    addProduct: (product) => {
        set((state) => ({
            listCart : [...state.listCart, product]
        }))
    },

    deleteProduct: (product: ICart) => {
        set((state) => ({
            listCart: state.listCart.filter(
                (p: ICart) => !(p.detail?.id === product.detail?.id && p.type === product.type)
            )
        }))
    },



    emptyCart: () => set({listCart : []})


}))
