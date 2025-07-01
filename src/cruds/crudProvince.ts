import {BASE_URL} from '../utils/constantes'
import type { IRequestProvince } from '../types/IProvince'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'



const BASE_PROVINCE = `${BASE_URL}/province`
const title = 'Provincia'

export const getAllProvinces = () => {
    return getAll(BASE_PROVINCE, title)
}

export const getProvinceById = (id: number) => {
    return getById(BASE_PROVINCE, title, id)
}

export const createProvince = async(province : IRequestProvince) =>{
    return createEntity(BASE_PROVINCE, title, province)
}

export const updatedProvince = async(newProvince : IRequestProvince, id: number) => {
    return updateEntity(BASE_PROVINCE, title, newProvince, id)
}

export const deleteCountry = async(id : number) => {
    return deleteEntity(BASE_PROVINCE, title, id)
}
