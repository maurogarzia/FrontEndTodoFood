import { create } from "zustand";
import type { IPromotions } from "../types/IPromotions";
import { getAllPromotions } from "../cruds/crudPromotions";


interface IUseStorePromotions {
    promotions: IPromotions[],
    activePromotion: IPromotions | null
    setActivePromotion : (incommingPromotion : IPromotions | null) => void 
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