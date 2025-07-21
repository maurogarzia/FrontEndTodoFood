import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStorePromotionDetails } from '../../../Store/useStorePromotionDetails'
import style from './ModalAdminPromotionDetails.module.css'
import { useStorePromotion } from '../../../Store/useStorePromotions'
import type { IRequestPromotionDetails } from '../../../types/IPromotionDetails'
import { createPromotionDetails, updatedPromotionDetails } from '../../../cruds/crudPromotionDetails'
import { SubModalAdminPromotionDetails } from '../SubModalAdminPromotionDetails/SubModalAdminPromotionDetails'

export const ModalAdminPromotionDetails = () => {

    const {activePromotionDetails, fetchPromotionsDetails} = useStorePromotionDetails()
    const {closeViewModalAdminPromotionDetails, viewSubModalPromotionDetails, openSubModalPromotionDetails} = useStoreModal()
    const {fetchPromotions, promotions} = useStorePromotion()

    useEffect(() => {
        fetchPromotions()
    },[])

    const [promotionDetail, setPromotionDetail] = useState<IRequestPromotionDetails>({
        id : activePromotionDetails?.id || null,
        discount : activePromotionDetails?.discount || 0,
        promotion : {id : activePromotionDetails?.promotion.id || null},
        price : activePromotionDetails?.price || 0,
        productsDetails : activePromotionDetails?.productsDetails?.map((d) => ({id : d.id})) || []
    })

    const [option, setOption] = useState<boolean>(false)


    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === 'promotion') {
            setPromotionDetail((prev) => ({
                ...prev,
                promotion : {
                    ...prev.promotion,
                    id : Number(value)
                }
            }))
        } else {
            setPromotionDetail((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activePromotionDetails){
                await updatedPromotionDetails(promotionDetail, promotionDetail.id!)
                closeViewModalAdminPromotionDetails()
                fetchPromotionsDetails()
            } else {
                await createPromotionDetails(promotionDetail)
                closeViewModalAdminPromotionDetails()
                fetchPromotionsDetails()
            }
        } catch (error:any) {
            console.log(error.message);
        }
    }


    const handleOpen = (selection : boolean) => {
        setOption(selection)
        openSubModalPromotionDetails()
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activePromotionDetails ? 'Editar Detalle de Promoción' : 'Crear Detalle de Promoción'}</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <label htmlFor="">Descuento</label>
                    <input type="number" value={promotionDetail.discount} name="discount" onChange={handleChange}/>

                    <label htmlFor="">Precio</label>
                    <input type="number" name="price" value={promotionDetail.price} placeholder='Precio' onChange={handleChange}/>

                    <label htmlFor="">Promoción</label>
                    <select name="promotion" value={promotionDetail.promotion.id!} onChange={handleChange}>
                        <option value="">Sin selección</option>
                        {promotions.map((promotion) => (
                            <option value={promotion.id}>{promotion.name}</option>
                        ))}
                    </select>

                    <button type='button' onClick={() => handleOpen(true)}>Agregar Productos</button>
                    <button type='button' onClick={() => handleOpen(false)}>Eliminar Productos</button>

                </div>
                <div className={style.containerButtons}>
                    <button type='submit' onClick={closeViewModalAdminPromotionDetails}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
            {viewSubModalPromotionDetails && <div className={style.modalBackdrop}><SubModalAdminPromotionDetails option={option} promotionDetail={promotionDetail} setPromotionDetail={setPromotionDetail}/></div>}
        </div>
    )
}