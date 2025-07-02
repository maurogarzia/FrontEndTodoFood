import { create } from "zustand";
import type { IPrice } from "../types/IPrice";
import { getAllPrices } from "../cruds/crudPrice";

interface IUseStorePrice {
    prices : IPrice[]
    activePrice : IPrice | null
    setActivePrice : (incommingPrice : IPrice | null) => void
    fetchPrice : () => Promise<void>
}

export const useStorePrice = create<IUseStorePrice>((set) => ({
    prices: [],
    activePrice : null,

    setActivePrice: (incommingPrice) => set({activePrice : incommingPrice}),
    
    fetchPrice : async() => {
        const fetchedPrice = await getAllPrices()
        if (fetchedPrice) {
            set({prices : fetchedPrice})
        } else {
            set({prices : []})
        }
    }
}))