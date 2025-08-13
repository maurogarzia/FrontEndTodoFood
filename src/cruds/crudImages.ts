import axios from '../components/interceptors/axiosInstance'
import {BASE_URL} from '../utils/constantes'
import { ErrorAlert } from '../utils/ErrorAlert'
import { deleteEntity, getAll, getById } from './crudGeneric'
import { SuccesAlerts } from '../utils/SuccesAlert'




const BASE_IMAGES = `${BASE_URL}/image`
const BASE_CLOUDINARY = `${BASE_URL}/upload`
const title = 'Imágenes'

export const getAllImages = () => {
    return getAll(BASE_IMAGES, title)
}

export const getImagesById = (id: number) => {
    return getById(BASE_IMAGES, title, id)
}

export const createImages = async(file : File) =>{
    const formData = new FormData()
    formData.append("file", file)
    
    try {
        const response = await axios.post(`${BASE_CLOUDINARY}`, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        SuccesAlerts('Creado', `${title} creado correctamente`)
        return response.data
    } catch (error : any) {
        console.log(`Error en createImages de ${title}`);
        ErrorAlert('Error', `Ocurrió un error al crear ${title}`)
    }
}

export const updatedImages = async(file : File, id: number) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await axios.put(`${BASE_CLOUDINARY}/${id}`, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        SuccesAlerts('Editado', `${title} editado correctamente`)
        return response.data
    } catch (error : any) {
        console.log(error.message);
        ErrorAlert('Error', `Ocurrió un error al editar ${title}`)
    }
}

export const deleteImages = async(id : number) => {
    return deleteEntity( BASE_IMAGES, title, id)
}
