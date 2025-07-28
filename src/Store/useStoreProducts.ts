import { create } from "zustand";
import type { IProducts } from "../types/IProducts";
import { getAllProducts, getProductsByCategory } from "../cruds/crudProducts";

interface IUseStoreProducts {
    products : IProducts[],
    burguers : IProducts[],
    drinks : IProducts[],
    vegetarian : IProducts[],
    accompaniment : IProducts[],

    activeProduct: IProducts | null
    setActiveProduct : (incommingProduct : IProducts | null) => void,
    fetchProduct : () => Promise<void>

    fetchBurguers : () => Promise<void>,
    fetchVegetarian : () => Promise<void>,
    fetchDrinks : () => Promise<void>,
    fetchAccompaniment : () => Promise<void>
}

export const useStoreProducts = create<IUseStoreProducts>((set) => ({
    products : [],
    activeProduct: null,
    burguers : [],
    vegetarian : [],
    drinks : [],
    accompaniment: [],

    setActiveProduct : (incommingProduct : IProducts | null) => set({activeProduct: incommingProduct}),

    fetchProduct: async() => {
        const fetchedProduct = await getAllProducts()
        if (fetchedProduct) {
            set({products : fetchedProduct})
        } else {
            set({products : []})
        }
        
    },

    fetchBurguers: async() => {
        const fetched = await getProductsByCategory('Hamburguesas')
        if (fetched) {
            set({burguers : fetched})
        } else {
            set({burguers : []})
        }
    },

    fetchDrinks: async() => {
        const fetched = await getProductsByCategory('Bebidas')
        if (fetched) {
            set({drinks : fetched})
        } else {
            set({drinks : []})
        }
    },

    fetchVegetarian: async() => {
        const fetched = await getProductsByCategory('Vegetariano')
        if (fetched) {
            set({vegetarian : fetched})
        } else {
            set({vegetarian : []})
        }
    },

    fetchAccompaniment: async() => {
        const fetched = await getProductsByCategory(`${encodeURIComponent('Acompañamiento')}`)
        if (fetched) {
            set({accompaniment : fetched})
        } else {
            set({accompaniment : []})
        }
    },

}))