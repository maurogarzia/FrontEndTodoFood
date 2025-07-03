import { create } from "zustand";

interface IUseStoreModal {
    viewModalAdminCountry : boolean,
    viewModalAdminProvince : boolean,
    viewModalAdminLocality : boolean

    openViewModalAdminCountry : VoidFunction,
    closeViewModalAdminCountry : VoidFunction,

    openViewModalAdminProvince : VoidFunction,
    closeViewModalAdminProvince : VoidFunction

    openViewModalAdminLocality : VoidFunction,
    closeViewModalAdminLocality : VoidFunction
}


export const useStoreModal = create<IUseStoreModal>((set) => ({
    viewModalAdminCountry : false,
    viewModalAdminProvince : false,
    viewModalAdminLocality : false,

    // Pais
    openViewModalAdminCountry : () => set({viewModalAdminCountry : true}),
    closeViewModalAdminCountry : () => set({viewModalAdminCountry : false}),

    // Provincia
    openViewModalAdminProvince : () => set({viewModalAdminProvince : true}),
    closeViewModalAdminProvince : () => set({viewModalAdminProvince : false}),

    // Localidad
    openViewModalAdminLocality : () => set({viewModalAdminLocality : true}),
    closeViewModalAdminLocality : () => set({viewModalAdminLocality : false})

}))