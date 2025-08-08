
import axios from '../components/interceptors/axiosInstance'
import type { IRequestUser } from '../types/IUser'
import {BASE_URL} from '../utils/constantes'
import { ErrorAlert } from '../utils/ErrorAlert'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_USERS = `${BASE_URL}/user`
const title = 'Usuarios'

export const getAllUsers= () => {
    return getAll(BASE_USERS, title)
}

export const getUsersById = (id: number) => {
    return getById(BASE_USERS, title, id)
}

export const createUsers = async(user : IRequestUser) =>{
    return createEntity(BASE_USERS, title, user)
}

export const updatedUser = async(newUser : IRequestUser, id: number) => {
    return updateEntity(BASE_USERS, title, newUser, id)
}

export const deleteUser = async(id : number) => {
    return deleteEntity(BASE_USERS, title, id)
}

export const getByUsername = async(username : string) => {
    try {
        const response = await axios.get(`${BASE_USERS}/username/${username}`)
        return response.data
    } catch (error : any) {
        console.log(error.message);
        ErrorAlert('Error', "No se pudo mostrar el usuario")
        
    }
}
