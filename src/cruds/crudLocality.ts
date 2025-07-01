import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'
import type { ILocality } from '../types/ILocality'



const BASE_LOCALITY = `${BASE_URL}/locality`
const title = 'Localidad'

export const getAllLocalities = () => {
    return getAll(BASE_LOCALITY, title)
}

export const getLocalityById = (id: number) => {
    return getById(BASE_LOCALITY, title, id)
}

export const createLocality = async(locality : ILocality) =>{
    return createEntity(BASE_LOCALITY, title, locality)
}

export const updatedLocality = async(newLocality : ILocality, id: number) => {
    return updateEntity(BASE_LOCALITY, title, newLocality, id)
}

export const deleteLocality = async(id : number) => {
    return deleteEntity(BASE_LOCALITY, title, id)
}
