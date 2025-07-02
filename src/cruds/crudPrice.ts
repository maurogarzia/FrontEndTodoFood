import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'
import type { IPrice } from '../types/IPrice'


const BASE_PRICE = `${BASE_URL}/price`
const title = 'Precio'

export const getAllPrices = () => {
    return getAll(BASE_PRICE, title)
}

export const getPriceById = (id: number) => {
    return getById(BASE_PRICE, title, id)
}

export const createPrice = async(price : IPrice) =>{
    return createEntity(BASE_PRICE, title, price)
}

export const updatedPrice = async(newPrice : IPrice, id: number) => {
    return updateEntity(BASE_PRICE, title, newPrice, id)
}

export const deletePrice = async(id : number) => {
    return deleteEntity(BASE_PRICE, title, id)
}
