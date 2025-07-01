import axios from "axios"
import { ErrorAlert } from "../utils/ErrorAlert";

export const getAll = async(url : string, title: string) => {
    try {
        const entities = await axios.get(url)
        return entities.data
    } catch (error : any) {
        console.log(`Errror de getAll de ${title}`);
        ErrorAlert('Error', `getAll de ${title} fallo`)
    }
}

export const getById = async(url: string, title: string, id: number) => {
    try {
        const entity = await axios.get(`${url}/${id}`)
        return entity.data
    } catch (error : any) {
        console.log(`Error en getById de ${title}`);
        ErrorAlert('Error', `getById de ${title} fallo`)
    }
}

export const createEntity = async(url: string, title: string, entity: any) => {
    try {
        const newEntity = await axios.post(url, entity)
        return newEntity.data
    } catch (error : any) {
        console.log(`Error en createEntity de ${title}`);
        ErrorAlert('Error', `createEntity de ${title} fallo`)
    }
}

export const updateEntity = async(url: string, title: string, entity: any, id: number) => {
    try {
        const updatedEntity = await axios.put(`${url}/${id}`, entity)
        return updatedEntity.data
    } catch (error : any) {
        console.log(`Error en updateEntity de ${title}`);
        ErrorAlert('Error', `updatedEntity de ${title} fallo`)
    }
}

export const deleteEntity = async(url: string, title: string, id: number) => {
    try {
        const deletedEntity = await axios.delete(`${url}/${id}`)
        return deletedEntity.data
    } catch (error : any) {
        console.log(`Error en deletedEntity de ${title}`);
        ErrorAlert('Error', `deletedEntity de ${title} fallo`)
        
    }
}