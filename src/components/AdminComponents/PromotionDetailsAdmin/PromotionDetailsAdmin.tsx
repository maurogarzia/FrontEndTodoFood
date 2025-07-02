import { useEffect } from 'react'

import style from './PromotionDetails.module.css'
import { useStorePromotionDetails } from '../../../Store/useStorePromotionDetails'

export const PromotionDetails = () => {

    const {fetchPromotionsDetails, promotionsDetails} = useStorePromotionDetails()

    useEffect(() => {
        fetchPromotionsDetails()
    },[])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Promoción</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Final</th>
                            <th>Descripcion</th>
                            <th>Descuento aplicado</th>
                            <th>Precio promocional</th>
                            <th>Imagen</th>
                            <th>Productos</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {promotionsDetails.map((promotionDetail) => (
                            <tr key={promotionDetail.id}>
                                <td>{promotionDetail.id ? promotionDetail.id : '' }</td>
                                <td>{promotionDetail.initDate ? String(promotionDetail.initDate) : ''}</td>
                                <td>{promotionDetail.finallyDate ? String(promotionDetail.finallyDate) : ''}</td>
                                <td>{promotionDetail.description ? promotionDetail.description : ''}</td>
                                <td>{promotionDetail.discount ? promotionDetail.discount : ''}</td>
                                <td>{promotionDetail.price ? promotionDetail.price.id : ''}</td>
                                <td>{promotionDetail.image ? promotionDetail.image.id : ''}</td>
                                <td>
                                    {promotionDetail.products.map((product, index) => (
                                        <span key={product.id}>
                                            {product.id}
                                            {index < promotionDetail.products.length - 1 && ', '}
                                            </span>
                                    ))}
                                </td>
                                
                                

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