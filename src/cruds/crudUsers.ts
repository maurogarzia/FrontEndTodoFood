
import type { IRequestUser } from '../types/IUser'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_USERS = `${BASE_URL}/users`
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
