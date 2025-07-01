import { create } from "zustand";
import type { IBIllDetail } from "../types/IBillDetail";
import { getAllBillDetails } from "../cruds/crudBillDetails";

interface IUseStoreBillDetails {
    billDetails : IBIllDetail[]
    activeBillDetails: IBIllDetail | null
    setActiveBillDetail : (incommingBillDetail : IBIllDetail | null) => void,
    fetchBillDetail : () => Promise<void>
}

export const useStoreBill = create<IUseStoreBillDetails>((set) => ({
    billDetails : [],
    activeBillDetails: null,

    setActiveBillDetail : (incommingBillDetail) => set({activeBillDetails: incommingBillDetail}),

    fetchBillDetail: async() => {
        const fetchedBillDetails = await getAllBillDetails()
        if (fetchedBillDetails) {
            set({billDetails : fetchedBillDetails})
        } else {
            set({billDetails : []})
        }
        
    }

}))