import { create } from "zustand";

interface IUseStoreModal {
    viewModalAdminCountry : boolean,
    viewModalAdminProvince : boolean,
    viewModalAdminLocality : boolean,
    viewModalAdminAddress : boolean

    openViewModalAdminCountry : VoidFunction,
    closeViewModalAdminCountry : VoidFunction,

    openViewModalAdminProvince : VoidFunction,
    closeViewModalAdminProvince : VoidFunction

    openViewModalAdminLocality : VoidFunction,
    closeViewModalAdminLocality : VoidFunction

    openViewModalAdminAddress : VoidFunction,
    closeViewModalAdminAddress : VoidFunction
}


export const useStoreModal = create<IUseStoreModal>((set) => ({
    viewModalAdminCountry : false,
    viewModalAdminProvince : false,
    viewModalAdminLocality : false,
    viewModalAdminAddress : false,

    // Pais
    openViewModalAdminCountry : () => set({viewModalAdminCountry : true}),
    closeViewModalAdminCountry : () => set({viewModalAdminCountry : false}),

    // Provincia
    openViewModalAdminProvince : () => set({viewModalAdminProvince : true}),
    closeViewModalAdminProvince : () => set({viewModalAdminProvince : false}),

    // Localidad
    openViewModalAdminLocality : () => set({viewModalAdminLocality : true}),
    closeViewModalAdminLocality : () => set({viewModalAdminLocality : false}),

    // Direccion
    openViewModalAdminAddress : () => set({viewModalAdminAddress : true}),
    closeViewModalAdminAddress : () => set({viewModalAdminAddress : false})

}))