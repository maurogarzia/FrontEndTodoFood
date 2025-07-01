
import type { IBIllDetail } from '../types/IBillDetail'

import {BASE_URL} from '../utils/constantes'
import { createEntity, deleteEntity, getAll, getById, updateEntity } from './crudGeneric'

const BASE_BILL_DETAILS = `${BASE_URL}/bill-details`
const title = 'Detalle Factura'

export const getAllBillDetails = () => {
    return getAll(BASE_BILL_DETAILS, title)
}

export const getBillDetailsById = (id: number) => {
    return getById(BASE_BILL_DETAILS, title, id)
}

export const createBillDetails = async(billDetails : IBIllDetail) =>{
    return createEntity(BASE_BILL_DETAILS, title, billDetails)
}

export const updatedBillDetails = async(newBillDetails : IBIllDetail, id: number) => {
    return updateEntity(BASE_BILL_DETAILS, title, newBillDetails, id)
}

export const deleteBillDetails = async(id : number) => {
    return deleteEntity(BASE_BILL_DETAILS, title, id)
}
