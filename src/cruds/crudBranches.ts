
import type { IRequestBranch } from '../types/IBranch'
import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_BRANCHES = `${BASE_URL}/branches`
const title = 'Sucursales'

export const getAllBranches= () => {
    return getAll(BASE_BRANCHES, title)
}

export const getBranchesById = (id: number) => {
    return getById(BASE_BRANCHES, title, id)
}

export const createBranches = async(branch : IRequestBranch) =>{
    return createEntity(BASE_BRANCHES, title, branch)
}

export const updatedBranch = async(newBranch : IRequestBranch, id: number) => {
    return updateEntity(BASE_BRANCHES, title, newBranch, id)
}

export const deleteBranch = async(id : number) => {
    return deleteEntity(BASE_BRANCHES, title, id)
}
