import { create } from "zustand";
import type { IProvince } from "../types/IProvince";
import { getAllProvinces } from "../cruds/crudProvince";

interface IUseStoreProvince {
    provinces : IProvince[]
    activeProvince: IProvince | null
    setActiveProvince : (incommingProvince : IProvince | null) => void,
    fetchProvince : () => Promise<void>
}

export const useStoreCountry = create<IUseStoreProvince>((set) => ({
    provinces : [],
    activeProvince: null,

    setActiveProvince : (incommingProvince : IProvince | null) => set({activeProvince: incommingProvince}),

    fetchProvince: async() => {
        const fetchedProvince = await getAllProvinces()
        set({provinces : fetchedProvince})
        
    }

}))