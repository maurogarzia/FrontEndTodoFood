import { create } from "zustand";

interface IUseStoreModal {
    viewModalAdminCountry : boolean,
    viewModalAdminProvince : boolean,

    openViewModalAdminCountry : VoidFunction,
    closeViewModalAdminCountry : VoidFunction,
    openViewModalAdminProvince : VoidFunction,
    closeViewModalAdminProvince : VoidFunction
}


export const useStoreModal = create<IUseStoreModal>((set) => ({
    viewModalAdminCountry : false,
    viewModalAdminProvince : false,

    // Pais
    openViewModalAdminCountry : () => set({viewModalAdminCountry : true}),
    closeViewModalAdminCountry : () => set({viewModalAdminCountry : false}),

    // Provincia
    openViewModalAdminProvince : () => set({viewModalAdminProvince : true}),
    closeViewModalAdminProvince : () => set({viewModalAdminProvince : false})

}))