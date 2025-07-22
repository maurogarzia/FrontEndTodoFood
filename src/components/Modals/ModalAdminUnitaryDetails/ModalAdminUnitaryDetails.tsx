import React, { useEffect, useState } from 'react'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import { useStoreUnitaryDetails } from '../../../Store/useStoreUnitaryDetails'
import style from './ModalAdminUnitaryDetails.module.css'
import type { IRequestUnitaryDetails } from '../../../types/IUnitaryDetails'
import { createUnitaryDetail, updatedUnitaryDetail } from '../../../cruds/crudUnitaryDetails'
import { useStoreModal } from '../../../Store/useStoreModal'

export const ModalAdminUnitaryDetails = () => {

    const {activeDetail, fetchDetails} = useStoreUnitaryDetails()
    const {productDetails, fetchProductDetails} = useStoreProductDetails()
    const {closeModalAdminUnitaryDetails} = useStoreModal()

    const [unitaryDetail, setUnitaryDetail] = useState<IRequestUnitaryDetails>({

        id : activeDetail?.id || null,
        quantity : activeDetail?.quantity || 0,
        productDetails : {id : activeDetail?.productDetails.id || null}
    })

    useEffect(() => {
        fetchProductDetails()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === 'productDetails'){
            setUnitaryDetail((prev) => ({
                ...prev,
                productDetails : {
                    id : Number(value)
                }
            }))
        } else {
            setUnitaryDetail((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activeDetail) {
                await updatedUnitaryDetail(unitaryDetail, unitaryDetail.id!)
                fetchDetails() 
                closeModalAdminUnitaryDetails()
            } else {
                await createUnitaryDetail(unitaryDetail)
                fetchDetails()
                closeModalAdminUnitaryDetails()
            }
        } catch (error : any) {
            console.log(error.message);
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <h1>{activeDetail ? 'Editar Detalle' : 'Crear Detalle'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <label htmlFor="">Cantidad</label>
                    <input type="number" name="quantity" onChange={handleChange}/>

                    <label htmlFor="">Productos</label>
                    <select name="productDetails" onChange={handleChange}>
                        <option value="">Sin selección</option>
                        {productDetails.map(product => (
                            <option key={product.id} value={product.id}>{product.product.name} {product.size.name}</option>
                        ))}
                    </select>

                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeModalAdminUnitaryDetails}>Cancelar</button>
                    <button  type='submit'>Aceptar</button>
                </div>
            </form>
        </div>
    )
}