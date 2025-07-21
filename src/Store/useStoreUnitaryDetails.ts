import { create } from "zustand";
import type { IUnitaryDetails } from "../types/IUnitaryDetails";
import { getAllUnitaryDetails } from "../cruds/crudUnitaryDetails";

interface IUseStoreUnitaryDetails {
    details : IUnitaryDetails[]
    activeDetail: IUnitaryDetails | null
    setActiveDEtail : (incommingDetail : IUnitaryDetails | null) => void,
    fetchDetails : () => Promise<void>
}

export const useStoreUnitaryDetails = create<IUseStoreUnitaryDetails>((set) => ({
    details : [],
    activeDetail: null,

    setActiveDEtail : (incommingDetail) => set({activeDetail: incommingDetail}),

    fetchDetails: async() => {
        const fetchedDetails = await getAllUnitaryDetails()
        if (fetchedDetails) {
            set({details : fetchedDetails})
        } else {
            set({details : []})
        }
        
    }

}))