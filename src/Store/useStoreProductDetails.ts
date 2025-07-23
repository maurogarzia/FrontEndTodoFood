import { create } from "zustand";
import type { IProductsDetails } from "../types/IProductsDetails";
import { getAllProductsDetails, getProductsDetailsByCategory  } from "../cruds/crudProductDetails";

interface IUseStoreProductsDetails {
    productDetails : IProductsDetails[]
    burguers : IProductsDetails[],
    drinks : IProductsDetails[],
    vegetarian : IProductsDetails[],
    accompaniment : IProductsDetails[],
    activeProductDetails: IProductsDetails | null
    setActiveProductDetails : (incommingProductDetails : IProductsDetails | null) => void,
    fetchProductDetails : () => Promise<void>

    fetchBurguers : () => Promise<void>
    fetchDrinks : () => Promise<void>
    fetchVegetarian : () => Promise<void>
    fetchAccompaniment : () => Promise<void>
    
}

export const useStoreProductDetails = create<IUseStoreProductsDetails>((set) => ({
    productDetails : [],
    burguers : [],
    drinks : [],
    vegetarian : [],
    accompaniment : [],
    activeProductDetails: null,

    setActiveProductDetails : (incommingProductDetails) => set({activeProductDetails: incommingProductDetails}),

    fetchProductDetails: async() => {
        const fetchedProductDetails = await getAllProductsDetails()
        if (fetchedProductDetails) {
            set({productDetails : fetchedProductDetails})
        } else {
            set({productDetails : []})
        }
    },

    fetchBurguers: async() => {
        const fetched = await getProductsDetailsByCategory('Hamburguesas')
        if (fetched) {
            set({burguers : fetched})
        } else {
            set({burguers : []})
        }
    },

    fetchDrinks: async() => {
        const fetched = await getProductsDetailsByCategory('Bebidas')
        if (fetched) {
            set({drinks : fetched})
        } else {
            set({drinks : []})
        }
    },

    fetchVegetarian: async() => {
        const fetched = await getProductsDetailsByCategory('Vegetariano')
        if (fetched) {
            set({vegetarian : fetched})
        } else {
            set({vegetarian : []})
        }
    },

    fetchAccompaniment: async() => {
        const fetched = await getProductsDetailsByCategory(`${encodeURIComponent('Acompañamiento')}`)
        if (fetched) {
            set({accompaniment : fetched})
        } else {
            set({accompaniment : []})
        }
    },

}))