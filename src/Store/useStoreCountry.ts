import { create } from "zustand";
import type { ICountry } from "../types/ICountry";
import { getAllCountries } from "../cruds/crudCountry";

interface IUseStoreCountry {
    countries : ICountry[]
    activeCountry: ICountry | null
    setActiveCountry : (incommingCountry : ICountry | null) => void,
    fetchCountry : () => Promise<void>
}

export const useStoreCountry = create<IUseStoreCountry>((set) => ({
    countries : [],
    activeCountry: null,

    setActiveCountry : (incommingCountry : ICountry | null) => set({activeCountry: incommingCountry}),

    fetchCountry: async() => {
        const fetchedCountry = await getAllCountries()
        if (fetchedCountry) {
            set({countries : fetchedCountry})
        } else {
            set({countries : []})
        }
        
    }

}))