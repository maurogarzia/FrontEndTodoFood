
import type { IBill } from '../types/IBill'

import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_BILL = `${BASE_URL}/bill`
const title = 'Factura'

export const getAllBills= () => {
    return getAll(BASE_BILL, title)
}

export const getBillById = (id: number) => {
    return getById(BASE_BILL, title, id)
}

export const createBill = async(bill : IBill) =>{
    return createEntity(BASE_BILL, title, bill)
}

export const updatedBill = async(newBill : IBill, id: number) => {
    return updateEntity(BASE_BILL, title, newBill, id)
}

export const deleteBill = async(id : number) => {
    return deleteEntity(BASE_BILL, title, id)
}
