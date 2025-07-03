import { create } from "zustand";

interface IUseStoreModal {
    viewModalAdminCountry : boolean,
    viewModalAdminProvince : boolean,
    viewModalAdminLocality : boolean,
    viewModalAdminAddress : boolean,
    viewModalAdminBranch : boolean,
    viewModalAdminSize : boolean,


    openViewModalAdminCountry : VoidFunction,
    closeViewModalAdminCountry : VoidFunction,

    openViewModalAdminProvince : VoidFunction,
    closeViewModalAdminProvince : VoidFunction

    openViewModalAdminLocality : VoidFunction,
    closeViewModalAdminLocality : VoidFunction

    openViewModalAdminAddress : VoidFunction,
    closeViewModalAdminAddress : VoidFunction

    openViewModalAdminBarnch : VoidFunction,
    closeViewModalAdminBranch : VoidFunction,

    openViewModalAdminSize : VoidFunction,
    closeViewModalAdminSize : VoidFunction
}


export const useStoreModal = create<IUseStoreModal>((set) => ({
    viewModalAdminCountry : false,
    viewModalAdminProvince : false,
    viewModalAdminLocality : false,
    viewModalAdminAddress : false,
    viewModalAdminBranch : false,
    viewModalAdminSize: false,

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
    closeViewModalAdminAddress : () => set({viewModalAdminAddress : false}),

    // Sucursal
    openViewModalAdminBarnch : () => set({viewModalAdminBranch : true}),
    closeViewModalAdminBranch : () => set({viewModalAdminBranch : false}),

    // Tamanio
    openViewModalAdminSize : () => set({viewModalAdminSize : true}),
    closeViewModalAdminSize : () => set({viewModalAdminSize : false}),

}))