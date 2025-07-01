import type { IRequestPromotions } from '../types/IPromotions'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'




const BASE_PROMOTIONS = `${BASE_URL}/promotions`
const title = 'Promociones'

export const getAllPromotions = () => {
    return getAll(BASE_PROMOTIONS, title)
}

export const getPromotionsById = (id: number) => {
    return getById(BASE_PROMOTIONS, title, id)
}

export const createPromotion = async(promotion : IRequestPromotions) =>{
    return createEntity(BASE_PROMOTIONS, title, promotion)
}

export const updatedPromotion = async(newPromotion : IRequestPromotions, id: number) => {
    return updateEntity(BASE_PROMOTIONS, title, newPromotion, id)
}

export const deletePromotion = async(id : number) => {
    return deleteEntity(BASE_PROMOTIONS, title, id)
}
