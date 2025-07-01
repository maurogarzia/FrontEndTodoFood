

import type { IRequestAddress } from '../types/IAddress'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'




const BASE_ADDRESS = `${BASE_URL}/address`
const title = 'Dirección'

export const getAllAddresses = () => {
    return getAll(BASE_ADDRESS, title)
}

export const getAddressById = (id: number) => {
    return getById(BASE_ADDRESS, title, id)
}

export const createAddress = async(address : IRequestAddress) =>{
    return createEntity(BASE_ADDRESS, title, address)
}

export const updatedAddress = async(newAddress : IRequestAddress, id: number) => {
    return updateEntity(BASE_ADDRESS, title, newAddress, id)
}

export const deleteAddress = async(id : number) => {
    return deleteEntity(BASE_ADDRESS, title, id)
}
