import React, { useEffect, useState, type FC } from 'react'
import styles from './SubModalAdminPromotionDetails.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import type { IRequestPromotionDetails } from '../../../types/IPromotionDetails'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import type { IProductsDetails } from '../../../types/IProductsDetails'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { SuccesAlerts } from '../../../utils/SuccesAlert'

interface ISubModalAdminPromotionDetails {
    option : boolean,
    promotionDetail : IRequestPromotionDetails,
    setPromotionDetail: React.Dispatch<React.SetStateAction<IRequestPromotionDetails>>;
}

export const SubModalAdminPromotionDetails : FC<ISubModalAdminPromotionDetails> = ({option,promotionDetail, setPromotionDetail}) => {

    const {closeSubModalPromotionDetails} = useStoreModal()
    const {fetchProductDetails, productDetails} = useStoreProductDetails()
    const [detailsInPromotionDetail, setDetailsInPromotionDetail] = useState<IProductsDetails[]>()

    useEffect(() => {
        fetchProductDetails()
        const fetchDetails = async() => {
                const filterDetails = productDetails.filter(p => 
                    promotionDetail.productsDetails.some(d => d.id === p.id)
                )
                setDetailsInPromotionDetail(filterDetails)
            }   
        fetchDetails()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = e.target.value

        if (option){
            const alreadyExist = promotionDetail.productsDetails.some(d => d.id === Number(selectedId))
            if (alreadyExist || !selectedId){
                ErrorAlert("Error", 'Este producto ya se encuentra en la promoción')
                return
            }

            setPromotionDetail(prev => ({
                ...prev,
                details : [...prev.productsDetails, {id : Number(selectedId)}]
            }))
            SuccesAlerts("Agregado", "Producto agregado a la promoción")
            closeSubModalPromotionDetails()
        }else{
            setPromotionDetail(prev => ({
                ...prev,
                details : prev.productsDetails.filter(d => d.id !== Number(selectedId))
            }))
            SuccesAlerts('Eliminado', 'Producto eliminado de la promoción')
            closeSubModalPromotionDetails()
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <h1>{option ? 'Agregar Productos a la Promoción' : 'Eliminar Productos a la Promoción'}</h1>
            <form>
                <div className={styles.containerData}>
                    {option ? 
                        <div>
                            <select name="details" onChange={handleChange}>
                                <option value="">Sin selección</option>
                                {productDetails.map((detail) => (
                                    <option value={detail.id}>{detail.product.name} {detail.size.name}</option>
                                ))}
                            </select>
                        </div>
                        : 
                        <div>
                            <select name="details" id="" onChange={handleChange}>
                                <option value="">Sin selección</option>
                                {detailsInPromotionDetail?.map(details => (
                                    <option value={details.id}>{details.product.name} {details.size.name}</option>
                                ))}
                            </select>
                        </div>}
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeSubModalPromotionDetails}>Cerrar</button>
                    
                </div>
            </form>
        </div>
    )
}