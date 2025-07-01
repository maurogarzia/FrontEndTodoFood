import { create } from "zustand";
import type { IAddress } from "../types/IAddress";
import { getAllAddresses } from "../cruds/crudAddress";

interface IUseStoreAddress {
    addresses : IAddress[]
    activeAddress: IAddress | null
    setActiveAddress : (incommingAddress : IAddress | null) => void,
    fetchAddress : () => Promise<void>
}

export const useStoreAddress = create<IUseStoreAddress>((set) => ({
    addresses : [],
    activeAddress: null,

    setActiveAddress : (incommingAddress : IAddress | null) => set({activeAddress: incommingAddress}),

    fetchAddress: async() => {
        const fetchedAddress = await getAllAddresses()
        if (fetchedAddress) {
            set({addresses : fetchedAddress})
        } else {
            set({addresses : []})
        }
        
    }

}))