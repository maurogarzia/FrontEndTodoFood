
import type { ICategory } from '../types/ICategory'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_CATEGORY = `${BASE_URL}/category`
const title = 'Categorías'

export const getAllCategories= () => {
    return getAll(BASE_CATEGORY, title)
}

export const getCategoryById = (id: number) => {
    return getById(BASE_CATEGORY, title, id)
}

export const createCategory = async(category : ICategory) =>{
    return createEntity(BASE_CATEGORY, title, category)
}

export const updatedCategory = async(newCategory : ICategory, id: number) => {
    return updateEntity(BASE_CATEGORY, title, newCategory, id)
}

export const deleteCategory = async(id : number) => {
    return deleteEntity(BASE_CATEGORY, title, id)
}
