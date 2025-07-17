import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStorePrice } from '../../../Store/useStorePrice'
import { useStorePromotionDetails } from '../../../Store/useStorePromotionDetails'
import style from './ModalAdminPromotionDetails.module.css'
import { useStorePromotion } from '../../../Store/useStorePromotions'
import type { IRequestPromotionDetails } from '../../../types/IPromotionDetails'
import { createPromotionDetails, updatedPromotionDetails } from '../../../cruds/crudPromotionDetails'

export const ModalAdminPromotionDetails = () => {

    const {activePromotionDetails, fetchPromotionsDetails} = useStorePromotionDetails()
    const {closeSubModalAdminPromotionDetails} = useStoreModal()
    const {prices, fetchPrice} = useStorePrice()
    const {fetchPromotions, promotions} = useStorePromotion()

    useEffect(() => {
        fetchPrice()
        fetchPromotions()
    },[])

    const [promotionDetail, setPromotionDetail] = useState<IRequestPromotionDetails>({
        id : activePromotionDetails?.id || null,
        discount : activePromotionDetails?.discount || 0,
        promotion : {id : activePromotionDetails?.promotion.id || null},
        price : {id : activePromotionDetails?.price.id || null},
        details : activePromotionDetails?.details?.map((d) => ({id : d.id})) || []
    })


    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === 'price' || name === 'promotion') {
            setPromotionDetail((prev) => ({
                ...prev,
                price : {
                    ...prev.price,
                    id : Number(value)
                },
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
                closeSubModalAdminPromotionDetails()
                fetchPromotionsDetails()
            } else {
                await createPromotionDetails(promotionDetail)
                closeSubModalAdminPromotionDetails()
                fetchPromotionsDetails()
            }
        } catch (error:any) {
            console.log(error.message);
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activePromotionDetails ? 'Editar Detalle de Promoción' : 'Crear Detalle de Promoción'}</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <label htmlFor="">Descuento</label>
                    <input type="number" name="discount" onChange={handleChange}/>

                    <label htmlFor="">Precio</label>
                    <select name="price" onChange={handleChange}>
                        <option value="">Sin selección</option>
                        {prices.map((price) => (
                            <option value={price.id!}>Precio Compra: {price.purchasePrice}, Precio Venta: {price.salesPrice}</option>
                        ))}
                    </select>

                    <label htmlFor="">Promoción</label>
                    <select name="promotion" onChange={handleChange}>
                        <option value="">Sin selección</option>
                        {promotions.map((promotion) => (
                            <option value={promotion.id}>{promotion.name}</option>
                        ))}
                    </select>

                    <button>Manejo de Productos</button>

                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeSubModalAdminPromotionDetails}>Cancelar</button>
                    <button >Aceptar</button>
                </div>
            </form>

        </div>
    )
}