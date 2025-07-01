import axios from 'axios'
import {BASE_URL} from '../utils/constantes'
import { ErrorAlert } from '../utils/ErrorAlert'
import type { IProvince } from '../types/IProvince'



const BASE_PROVINCE = `${BASE_URL}/province`

export const getAllProvinces = async() => {
    try {
        const provinces = await axios.get(BASE_PROVINCE)
        return provinces.data
    } catch (error : any) {
        console.log('Error en getAllProvinces', error.message);
        ErrorAlert('Error', 'No se pudo mostrar las provincias')
    }
}

export const getProvinceById = async(id : number) => {
    try {
        const province = await axios.get(`${BASE_PROVINCE}/${id}`)
        return province.data
    } catch (error : any) {
        console.log('Error en getProvinceById', error.message);
        ErrorAlert('Error', 'No se encontro la provincia')
    }
}

export const createProvince = async(country : IProvince) =>{
    try{
        const newProvince = await axios.post(`${BASE_PROVINCE}`,country)
        return newProvince.data
    }catch(error: any){
        console.log('Error en createProvince', error.message);
        ErrorAlert('Error', 'No se pudo crear la provincia')
    }
}

export const updatedProvince = async(newProvince : IProvince, id: number) => {
    try {
        const updatedProvince = await axios.put(`${BASE_PROVINCE}/${id}`, newProvince)
        return updatedProvince.data
    } catch (error : any) {
        console.log('Error en updateProvince', error.message);
        ErrorAlert('Error', 'No se pudo actualizar la provincia')
    }
}

export const deleteProvince = async(id : number) => {
    try {
        const deletedProvince = await axios.delete(`${BASE_PROVINCE}/${id}`)
        return deletedProvince.data
    } catch (error : any) {
        console.log('Error en deleteCountry', error.message);
        ErrorAlert('Error', 'No se pudo eliminar el país')
    }
}
