import axios from "axios"
import { ErrorAlert } from "../utils/ErrorAlert";
import { SuccesAlerts } from "../utils/SuccesAlert";

export const getAll = async(url : string, title: string) => {
    try {
        const entities = await axios.get(url)
        return entities.data 
    } catch (error : any) {
        console.log(`Errror de getAll de ${title}`);
    }
}

export const getById = async(url: string, title: string, id: number) => {
    try {
        const entity = await axios.get(`${url}/${id}`)
        return entity.data
    } catch (error : any) {
        console.log(`Error en getById de ${title}`);
    }
}

export const createEntity = async(url: string, title: string, entity: any) => {
    try {
        const newEntity = await axios.post(url, entity)
        SuccesAlerts('Creado', `${title} creado correctamente`)
        return newEntity.data
    } catch (error : any) {
        console.log(`Error en createEntity de ${title}`);
        ErrorAlert('Error', `Ocurrió un error al crear ${title}`)
    }
}

export const updateEntity = async(url: string, title: string, entity: any, id: number) => {
    try {
        const updatedEntity = await axios.put(`${url}/${id}`, entity)
        SuccesAlerts('Editado', `${title} editado correctamente`)
        return updatedEntity.data
    } catch (error : any) {
        console.log(`Error en updateEntity de ${title}`);
        ErrorAlert('Error', `Ocurrió un error al editar ${title}`)
    }
}

export const deleteEntity = async(url: string, title: string, id: number) => {
    try {
        const deletedEntity = await axios.delete(`${url}/${id}`)
        SuccesAlerts('Eliminado', `${title} eliminado correctamente`)
        return deletedEntity.data
    } catch (error : any) {
        console.log(`Error en deletedEntity de ${title}`);
        ErrorAlert('Error', `Ocurrió un error al eliminar ${title}`)
        
    }
}