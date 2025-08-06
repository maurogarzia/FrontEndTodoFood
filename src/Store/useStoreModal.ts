import { create } from "zustand";

interface IUseStoreModal {
    viewModalAdminCountry : boolean,
    viewModalAdminProvince : boolean,
    viewModalAdminLocality : boolean,
    viewModalAdminAddress : boolean,
    viewModalAdminBranch : boolean,
    viewModalAdminSize : boolean,
    viewModalAdminCategory : boolean,
    viewModalAdminImage : boolean,
    viewModalAdminPrice : boolean,
    viewModalAdminUser : boolean,
    viewModalAdminProduct : boolean,
    viewModalAdminProductDetails : boolean,
    viewModalAdminPromotion : boolean,
    viewModalAdminPromotionDetails : boolean,
    viewModalAdminUnitaryDetail : boolean,
    viewSubModalPromotionDetails : boolean,
    viewModalRegister : boolean



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
    closeViewModalAdminSize : VoidFunction,

    openViewModalAdminCategory : VoidFunction,
    closeViewModalAdminCategory : VoidFunction,

    openViewModalAdminImage : VoidFunction,
    closeViewModalAdminImage : VoidFunction,

    openViewModalAdminPrice : VoidFunction,
    closeViewModalAdminPrice : VoidFunction,

    openViewModalAdminUser : VoidFunction,
    closeViewModalAdminUser : VoidFunction

    openViewModalAdminProduct : VoidFunction,
    closeViewModalAdminProduct : VoidFunction,

    openViewModalAdminProductDetails : VoidFunction,
    closeViewModalAdminProductDetails : VoidFunction,

    openViewModalAdminPromotion : VoidFunction,
    closeViewModalAdminPromotion : VoidFunction,

    openViewModalAdminPromotionDetails : VoidFunction,
    closeViewModalAdminPromotionDetails : VoidFunction,

    openModalAdminUnitaryDetails: VoidFunction,
    closeModalAdminUnitaryDetails: VoidFunction

    openSubModalPromotionDetails: VoidFunction,
    closeSubModalPromotionDetails: VoidFunction,

    openViewModalRegister : VoidFunction,
    closeViewModalRegister : VoidFunction
}


export const useStoreModal = create<IUseStoreModal>((set) => ({
    viewModalAdminCountry : false,
    viewModalAdminProvince : false,
    viewModalAdminLocality : false,
    viewModalAdminAddress : false,
    viewModalAdminBranch : false,
    viewModalAdminSize: false,
    viewModalAdminCategory : false,
    viewModalAdminImage : false,
    viewModalAdminPrice : false,
    viewModalAdminUser : false,
    viewModalAdminProduct : false,
    viewModalAdminProductDetails : false,
    viewModalAdminPromotion : false,
    viewModalAdminPromotionDetails : false,
    viewModalAdminUnitaryDetail: false,
    viewSubModalPromotionDetails : false,
    viewModalRegister : false,

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

    // Categoria
    openViewModalAdminCategory : () => set({viewModalAdminCategory : true}),
    closeViewModalAdminCategory : () => set({viewModalAdminCategory : false}),

    // Imagen
    openViewModalAdminImage : () => set({viewModalAdminImage : true}),
    closeViewModalAdminImage : () => set({viewModalAdminImage : false}),

    // Precio
    openViewModalAdminPrice : () => set({viewModalAdminPrice : true}),
    closeViewModalAdminPrice : () => set({viewModalAdminPrice : false}),

    // Usuario
    openViewModalAdminUser : () => set({viewModalAdminUser : true}),
    closeViewModalAdminUser : () => set({viewModalAdminUser : false}),

    //Producto
    openViewModalAdminProduct : () => set({viewModalAdminProduct : true}),
    closeViewModalAdminProduct : () => set({viewModalAdminProduct : false}),

    //Producto Detalle
    openViewModalAdminProductDetails : () => set({viewModalAdminProductDetails : true}),
    closeViewModalAdminProductDetails : () => set({viewModalAdminProductDetails : false}),

    // Promocion
    openViewModalAdminPromotion : () => set({viewModalAdminPromotion : true}),
    closeViewModalAdminPromotion : () => set({viewModalAdminPromotion : false}),

    // Modal de Detalle Promocion
    openViewModalAdminPromotionDetails : () => set({viewModalAdminPromotionDetails : true}),
    closeViewModalAdminPromotionDetails : () => set({viewModalAdminPromotionDetails : false}),
    
    // Modal de Detalle Unitario
    openModalAdminUnitaryDetails : () => set({viewModalAdminUnitaryDetail : true}),
    closeModalAdminUnitaryDetails : () => set({viewModalAdminUnitaryDetail : false}),
    
    // SubModal de Promocion Detalles
    openSubModalPromotionDetails : () => set({viewSubModalPromotionDetails : true}),
    closeSubModalPromotionDetails : () => set({viewSubModalPromotionDetails : false}),

    openViewModalRegister : () => set({viewModalRegister : true}),
    closeViewModalRegister : () => set({viewModalRegister : false})

}))