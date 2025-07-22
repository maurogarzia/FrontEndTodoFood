import React, { useEffect, useState, type FC } from 'react'
import style from './SubModalAdminPromotionDetails.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreUnitaryDetails } from '../../../Store/useStoreUnitaryDetails'
import type { IRequestPromotionDetails } from '../../../types/IPromotionDetails'
import type { IUnitaryDetails } from '../../../types/IUnitaryDetails'
import { SuccesAlerts } from '../../../utils/SuccesAlert'
import { ErrorAlert } from '../../../utils/ErrorAlert'

interface ISubModalAdminPromotionDetails {
    option : boolean,
    promotionDetail : IRequestPromotionDetails
    setPromotionDetail : React.Dispatch<React.SetStateAction<IRequestPromotionDetails>>
}


export const SubModalAdminPromotionDetails : FC<ISubModalAdminPromotionDetails> = ({option, promotionDetail, setPromotionDetail}) => {

    const {closeSubModalPromotionDetails} = useStoreModal()
    const {details, fetchDetails} = useStoreUnitaryDetails()
    const [listDetails, setListDetails] = useState<IUnitaryDetails[]>()

    useEffect(() => {
        fetchDetails()
        const fetchedDetails = async() => {

            const listfilter = details.filter(d => 
                promotionDetail.unitaryDetails.some(u => u.id === d.id)
            )
            setListDetails(listfilter)
        }
        fetchedDetails()
    },[])


    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = e.target.value

        try {
            // Agrego ids al array
            if (option) {

                // Verifico que el producto exista en la promocion
                const existDetailInPromotion = promotionDetail.unitaryDetails.some(u => u.id === Number(selectedId))
                if (existDetailInPromotion) {
                    ErrorAlert('Error', 'El producto ya se encuenra agregado a la promoción ')
                    return
                }

                setPromotionDetail((prev) => ({
                    ...prev,
                    unitaryDetails : [...prev.unitaryDetails, {id : Number(selectedId)}]
                }))
                closeSubModalPromotionDetails()
                SuccesAlerts("Agreado", "Se agregó el detalle correctamente")
            }else {
                const filterDetails = promotionDetail.unitaryDetails.filter(u => u.id !== Number(selectedId))
                setPromotionDetail((prev) => ({
                    ...prev,
                    unitaryDetails : filterDetails
                }))
                closeSubModalPromotionDetails()
                SuccesAlerts("Eliminado", "Se eliminó el detalle correctamente")

            }
        } catch (error : any) {
            console.log(error.message);
            ErrorAlert('Error', 'Ocurrió un error al intentar agregar/eliminar un detalle')
            closeSubModalPromotionDetails()
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{option ? 'Agregar Detalles Unitarios' : 'Eliminar Detalles Unitarios'}</h1>

            <form action="">
                <div className={style.containerData}>
                    {option ? 

                    // Agrega detalles unitarios
                    (<div>

                        <select name="unitaryDetails" onChange={handleChange}>
                            <option disabled selected>Sin selección</option>
                            {details.map((d) => (
                                <option key={d.id} value={d.id}>{d.quantity} {d.productDetails.product.name} {d.productDetails.size.name}</option>
                            ))}
                        </select>

                    </div> )
                    : 

                    // Elimina detalles unitarios
                    (<div>
                        <select name="unitaryDetails" onChange={handleChange}>
                            <option value="">Sin selección</option>
                            {listDetails?.map(l => (
                                <option key={l.id} value={l.id}>{l.quantity} {l.productDetails.product.name} {l.productDetails.size.name}</option>
                            ))}
                        </select>
                    </div>)}
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeSubModalPromotionDetails}>Cerrar</button>
                </div>
            </form>

        </div>
    )
}