
import type { IRequestPromotion } from '../types/IPromotion'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'




const BASE_PROMOTIONS = `${BASE_URL}/promotion`
const title = 'Promociones'

export const getAllPromotions = () => {
    return getAll(BASE_PROMOTIONS, title)
}

export const getPromotionsById = (id: number) => {
    return getById(BASE_PROMOTIONS, title, id)
}

export const createPromotion = async(promotion : IRequestPromotion) =>{
    return createEntity(BASE_PROMOTIONS, title, promotion)
}

export const updatedPromotion = async(newPromotion : IRequestPromotion, id: number) => {
    return updateEntity(BASE_PROMOTIONS, title, newPromotion, id)
}

export const deletePromotion = async(id : number) => {
    return deleteEntity(BASE_PROMOTIONS, title, id)
}
