import { create } from "zustand";

import { getAllPromotionDetails } from "../cruds/crudPromotionDetails";
import type { IPromotionDetails } from "../types/IPromotionDetails";


interface IUseStorePromotionsDetails {
    promotionsDetails: IPromotionDetails[],
    activePromotionDetails: IPromotionDetails | null
    setActivePromotionDetails : (incommingPromotionDetails : IPromotionDetails | null) => void 
    fetchPromotionsDetails : () => Promise<void>
}

export const useStorePromotionDetails = create<IUseStorePromotionsDetails>((set) => ({
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