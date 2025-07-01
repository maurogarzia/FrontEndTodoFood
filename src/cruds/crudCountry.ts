import {BASE_URL} from '../utils/constantes'
import type { ICountry } from '../types/ICountry'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'


const BASE_COUNTRY = `${BASE_URL}/country`
const title = 'País'

export const getAllCountries = () => {
    return getAll(BASE_COUNTRY, title)
}

export const getCountryById = (id: number) => {
    return getById(BASE_COUNTRY, title, id)
}

export const createCountry = async(country : ICountry) =>{
    return createEntity(BASE_COUNTRY, title, country)
}

export const updatedCountry = async(newCountry : ICountry, id: number) => {
    return updateEntity(BASE_COUNTRY, title, newCountry, id)
}

export const deleteCountry = async(id : number) => {
    return deleteEntity(BASE_COUNTRY, title, id)
}
