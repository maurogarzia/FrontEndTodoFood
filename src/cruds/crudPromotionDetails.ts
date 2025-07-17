

import type { IRequestPromotionDetails } from '../types/IPromotionDetails'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'




const BASE_PROMOTIONS_DETAILS = `${BASE_URL}/promotions-details`
const title = 'Detalles Promoción'

export const getAllPromotionDetails = () => {
    return getAll(BASE_PROMOTIONS_DETAILS, title)
}

export const getPromotionDetailsById = (id: number) => {
    return getById(BASE_PROMOTIONS_DETAILS, title, id)
}

export const createPromotionDetails = async(promotionDetail : IRequestPromotionDetails) =>{
    return createEntity(BASE_PROMOTIONS_DETAILS, title, promotionDetail)
}

export const updatedPromotionDetails = async(newPromotionDetails : IRequestPromotionDetails, id: number) => {
    return updateEntity(BASE_PROMOTIONS_DETAILS, title, newPromotionDetails, id)
}

export const deletePromotionDetails = async(id : number) => {
    return deleteEntity(BASE_PROMOTIONS_DETAILS, title, id)
}
