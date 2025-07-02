import { create } from "zustand";

interface IUseStoreModal {
    viewModalAdminCountry : boolean,

    openViewModalAdminCountry : VoidFunction
    closeViewModalAdminCountry : VoidFunction
}


export const useStoreModal = create<IUseStoreModal>((set) => ({
    viewModalAdminCountry : false,

    openViewModalAdminCountry : () => set({viewModalAdminCountry : true}),
    closeViewModalAdminCountry : () => set({viewModalAdminCountry : false})
}))