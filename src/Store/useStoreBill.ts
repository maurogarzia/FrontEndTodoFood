import { create } from "zustand";
import type { IBill } from "../types/IBill";
import { getAllBills } from "../cruds/crudBill";

interface IUseStoreBill {
    bills : IBill[]
    activeBill: IBill | null
    setActiveBill : (incommingBill : IBill | null) => void,
    fetchBill : () => Promise<void>
}

export const useStoreBill = create<IUseStoreBill>((set) => ({
    bills : [],
    activeBill: null,

    setActiveBill : (incommingBill) => set({activeBill: incommingBill}),

    fetchBill: async() => {
        const fetchedBill = await getAllBills()
        if (fetchedBill) {
            set({bills : fetchedBill})
        } else {
            set({bills : []})
        }
        
    }

}))