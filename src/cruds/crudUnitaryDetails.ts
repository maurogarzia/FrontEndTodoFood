
import type { ISize } from '../types/ISize'
import type { IUnitaryDetails } from '../types/IUnitaryDetails'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_UNITARY_DETAILS = `${BASE_URL}/unitary_details`
const title = 'Detalles Unitarios'

export const getAllUnitaryDetails= () => {
    return getAll(BASE_UNITARY_DETAILS, title)
}

export const getUnitaryDetailsById = (id: number) => {
    return getById(BASE_UNITARY_DETAILS, title, id)
}

export const createUnitaryDetail = async(size : ISize) =>{
    return createEntity(BASE_UNITARY_DETAILS, title, size)
}

export const updatedUnitaryDetail = async(newDetail : IUnitaryDetails, id: number) => {
    return updateEntity(BASE_UNITARY_DETAILS, title, newDetail, id)
}

export const deleteUnitaryDetail = async(id : number) => {
    return deleteEntity(BASE_UNITARY_DETAILS, title, id)
}
