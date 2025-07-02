
import { useEffect } from 'react'
import { useStorePromotion } from '../../../Store/useStorePromotions'
import style from './PromotionAdmin.module.css'

export const PromotionAdmin = () => {

    const {fetchPromotions, promotions} = useStorePromotion()


    useEffect(() => {
        fetchPromotions()
    } ,[])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Promociones</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Detalle de la Promoción</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {promotions.map((promotion) => (
                            <tr key={promotion.id}>
                                <td>{promotion.id ? promotion.id : '' }</td>
                                <td>{promotion.name ? promotion.name : ''}</td>
                                <td>{promotion.promotionDetails.id ? promotion.promotionDetails.id : ''}</td>
                                

                                <td>
                                    <div className={style.actionButtons}>
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        </div>
    )
}