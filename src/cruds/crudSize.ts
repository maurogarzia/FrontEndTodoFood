
import type { ISize } from '../types/ISize'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_SIZE = `${BASE_URL}/size`
const title = 'Tamaños'

export const getAllSizes= () => {
    return getAll(BASE_SIZE, title)
}

export const getSizeById = (id: number) => {
    return getById(BASE_SIZE, title, id)
}

export const createSize = async(size : ISize) =>{
    return createEntity(BASE_SIZE, title, size)
}

export const updatedSize = async(newSize : ISize, id: number) => {
    return updateEntity(BASE_SIZE, title, newSize, id)
}

export const deleteSize = async(id : number) => {
    return deleteEntity(BASE_SIZE, title, id)
}
