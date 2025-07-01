import { create } from "zustand";
import type { ISize } from "../types/ISize";
import { getAllSizes } from "../cruds/crudSize";

interface IUseStoreSize {
    sizes : ISize[]
    activeSize: ISize | null
    setActiveSize : (incommingSize : ISize | null) => void,
    fetchSize : () => Promise<void>
}

export const useStoreSize = create<IUseStoreSize>((set) => ({
    sizes : [],
    activeSize: null,

    setActiveSize : (incommingSize) => set({activeSize: incommingSize}),

    fetchSize: async() => {
        const fetchedSize = await getAllSizes()
        if (fetchedSize) {
            set({sizes : fetchedSize})
        } else {
            set({sizes : []})
        }
        
    }

}))