import { create } from "zustand";
import type { IBranch } from "../types/IBranch";
import { getAllBranches } from "../cruds/crudBranches";

interface IUseStoreBranch {
    branches : IBranch[]
    activeBranches: IBranch | null
    setActiveBranches : (incommingBranches : IBranch | null) => void,
    fetchBranch : () => Promise<void>
}

export const useStoreBranch = create<IUseStoreBranch>((set) => ({
    branches : [],
    activeBranches: null,

    setActiveBranches : (incommingBranches) => set({activeBranches: incommingBranches}),

    fetchBranch: async() => {
        const fetchBranch = await getAllBranches()
        if (fetchBranch) {
            set({branches : fetchBranch})
        } else {
            set({branches : []})
        }
        
    }

}))