import axios from 'axios'
import {BASE_URL} from '../utils/constantes'
import { ErrorAlert } from '../utils/ErrorAlert'
import type { ICountry } from '../types/ICountry'


const BASE_COUNTRY = `${BASE_URL}/country`

export const getAllCountries = async() => {
    try {
        const countries = await axios.get(BASE_COUNTRY)
        return countries.data
    } catch (error : any) {
        console.log('Error en getAllCountries', error.message);
        ErrorAlert('Error', 'No se pudo mostrar los paises')
    }
}

export const getCountryById = async(id : number) => {
    try {
        const country = await axios.get(`${BASE_COUNTRY}/${id}`)
        return country.data
    } catch (error : any) {
        console.log('Error en getCountryById', error.message);
        ErrorAlert('Error', 'No se encontro el País')
    }
}

export const createCountry = async(country : ICountry) =>{
    try{
        const newCountry = await axios.post(`${BASE_COUNTRY}`,country)
        return newCountry.data
    }catch(error: any){
        console.log('Error en createCountry', error.message);
        ErrorAlert('Error', 'No se pudo crear el pais')
    }
}

export const updatedCountry = async(newCountry : ICountry, id: number) => {
    try {
        const updatedCountry = await axios.put(`${BASE_COUNTRY}/${id}`, newCountry)
        return updatedCountry.data
    } catch (error : any) {
        console.log('Error en updateCountry', error.message);
        ErrorAlert('Error', 'No se pudo actualizar el país')
    }
}

export const deleteCountry = async(id : number) => {
    try {
        const deletedCountry = await axios.delete(`${BASE_COUNTRY}/${id}`)
        return deletedCountry.data
    } catch (error : any) {
        console.log('Error en deleteCountry', error.message);
        ErrorAlert('Error', 'No se pudo eliminar el país')
    }
}
