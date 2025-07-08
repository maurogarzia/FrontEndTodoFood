import type { IRequestProductsDetails } from '../types/IProductsDetails'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'




const BASE_PRODUCTS_DETAILS = `${BASE_URL}/product-details`
const title = 'Producto Detalles'

export const getAllProductsDetails = () => {
    return getAll(BASE_PRODUCTS_DETAILS, title)
}

export const getProductDetailsById = (id: number) => {
    return getById(BASE_PRODUCTS_DETAILS, title, id)
}

export const createProductDetails = async(productDetails : IRequestProductsDetails) =>{
    return createEntity(BASE_PRODUCTS_DETAILS, title, productDetails)
}

export const updatedProductDetails = async(newProductDetails : IRequestProductsDetails, id: number) => {
    return updateEntity(BASE_PRODUCTS_DETAILS, title, newProductDetails, id)
}

export const deleteProductDetails = async(id : number) => {
    return deleteEntity(BASE_PRODUCTS_DETAILS, title, id)
}
