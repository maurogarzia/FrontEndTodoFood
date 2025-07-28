import axios from 'axios'
import type { IRequestProducts } from '../types/IProducts'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'


const BASE_PRODUCTS = `${BASE_URL}/product`
const title = 'Productos'

export const getAllProducts = () => {
    return getAll(BASE_PRODUCTS, title)
}

export const getProductById = (id: number) => {
    return getById(BASE_PRODUCTS, title, id)
}

export const createProduct = async(product : IRequestProducts) =>{
    return createEntity(BASE_PRODUCTS, title, product)
}

export const updatedProduct = async(newProduct : IRequestProducts, id: number) => {
    return updateEntity(BASE_PRODUCTS, title, newProduct, id)
}

export const deleteProduct = async(id : number) => {
    return deleteEntity(BASE_PRODUCTS, title, id)
}

export const getProductsByCategory = async (name : string) => {
    try {
        const response = await axios.get(`${BASE_PRODUCTS}/by-category?name=${name}`)
        return response.data
    } catch (error : any) {
        console.log('Ocurrio un error en el findByCategory de Products');
    }
}

