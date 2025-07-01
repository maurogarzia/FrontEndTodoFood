import { create } from "zustand";

interface IUseStoreAdmin {
    page : String
    setPage : (option : String) => void
}

export const useStoreAdmin = create<IUseStoreAdmin>((set) => ({
    page : 'admin',

    setPage : (option) => set({page : option})
}))