import { create } from "zustand";
import type { IPromotionsDetails } from "../types/IPromotionsDetails";
import { getAllPromotionDetails } from "../cruds/crudPromotionDetails";


interface IUseStorePromotionsDetails {
    promotionsDetails: IPromotionsDetails[],
    activePromotionDetails: IPromotionsDetails | null
    setActivePromotionDetails : (incommingPromotionDetails : IPromotionsDetails | null) => void 
    fetchPromotionsDetails : () => Promise<void>
}

export const useStorePromotion = create<IUseStorePromotionsDetails>((set) => ({
    promotionsDetails : [],
    activePromotionDetails: null,

    setActivePromotionDetails : (incommingPromotionDetails) => set({activePromotionDetails : incommingPromotionDetails}),

    fetchPromotionsDetails: async() => {
        const fetchedPromotionsDetails = await getAllPromotionDetails()
        if (fetchedPromotionsDetails) {
            set({promotionsDetails: fetchedPromotionsDetails})
        } else {
            set({promotionsDetails : []})
        }
    }

}))