import { create } from "zustand";
import type { ICategory } from "../types/ICategory";
import { getAllCategories } from "../cruds/crudCategory";

interface IUseStoreCategory {
    categories : ICategory[]
    activeCategory: ICategory | null
    setActiveCategory : (incommingCategory : ICategory | null) => void,
    fetchCategory : () => Promise<void>
}

export const useStoreCategory = create<IUseStoreCategory>((set) => ({
    categories : [],
    activeCategory: null,

    setActiveCategory : (incommingCategory) => set({activeCategory: incommingCategory}),

    fetchCategory: async() => {
        const fetchedCategory = await getAllCategories()
        if (fetchedCategory) {
            set({categories : fetchedCategory})
        } else {
            set({categories : []})
        }
        
    }

}))