import { create } from "zustand";
import type { ILocality } from "../types/ILocality";
import { getAllLocalities } from "../cruds/crudLocality";

interface IUseStoreLocality {
    localities : ILocality[]
    activeLocality : ILocality | null
    setActiveLocality : (incommingLocality : ILocality | null) => void
    fetchLocality : () => Promise<void>
}

export const useStoreLocality = create<IUseStoreLocality>((set) => ({
    localities: [],
    activeLocality : null,

    setActiveLocality: (incommingLocality) => set({activeLocality : incommingLocality}),
    
    fetchLocality : async() => {
        const fetchedLocality = await getAllLocalities()
        if (fetchedLocality) {
            set({localities : fetchedLocality})
        } else {
            set({localities : []})
        }
    }
}))