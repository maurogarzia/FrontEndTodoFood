import type { IImage } from '../types/IImage'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'




const BASE_IMAGES = `${BASE_URL}/images`
const title = 'Imágenes'

export const getAllImages = () => {
    return getAll(BASE_IMAGES, title)
}

export const getImagesById = (id: number) => {
    return getById(BASE_IMAGES, title, id)
}

export const createImages = async(image : IImage) =>{
    return createEntity(BASE_IMAGES, title, image)
}

export const updatedImages = async(newImage : IImage, id: number) => {
    return updateEntity(BASE_IMAGES, title, newImage, id)
}

export const deleteImages = async(id : number) => {
    return deleteEntity( BASE_IMAGES, title, id)
}
