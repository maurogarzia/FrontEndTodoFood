import { create } from "zustand";

import { getAllPromotions } from "../cruds/crudPromotions";
import type { IPromotion } from "../types/IPromotion";


interface IUseStorePromotions {
    promotions: IPromotion[],
    activePromotion: IPromotion | null
    setActivePromotion : (incommingPromotion : IPromotion | null) => void 
    fetchPromotions : () => Promise<void>
}

export const useStorePromotion = create<IUseStorePromotions>((set) => ({
    promotions : [],
    activePromotion: null,

    setActivePromotion : (incommingPromotion) => set({activePromotion : incommingPromotion}),

    fetchPromotions : async() => {
        const fetchedPromotions = await getAllPromotions()
        if (fetchedPromotions) {
            set({promotions : fetchedPromotions})
        } else {
            set({promotions : []})
        }
    }

}))