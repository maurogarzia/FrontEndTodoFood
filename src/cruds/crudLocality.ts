import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'
import type { IRequestLocality } from '../types/ILocality'



const BASE_LOCALITY = `${BASE_URL}/locality`
const title = 'Localidad'

export const getAllLocalities = () => {
    return getAll(BASE_LOCALITY, title)
}

export const getLocalityById = (id: number) => {
    return getById(BASE_LOCALITY, title, id)
}

export const createLocality = async(locality : IRequestLocality) =>{
    return createEntity(BASE_LOCALITY, title, locality)
}

export const updatedLocality = async(newLocality : IRequestLocality, id: number) => {
    return updateEntity(BASE_LOCALITY, title, newLocality, id)
}

export const deleteLocality = async(id : number) => {
    return deleteEntity(BASE_LOCALITY, title, id)
}
