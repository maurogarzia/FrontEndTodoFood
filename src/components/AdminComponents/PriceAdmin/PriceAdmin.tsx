import { useEffect } from 'react'

import style from './PriceAdmin.module.css'
import { useStorePrice } from '../../../Store/useStorePrice'
import type { IPrice } from '../../../types/IPrice'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminPrice } from '../../Modals/ModalAdminPrice/ModalAdminPrice'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { deletePrice } from '../../../cruds/crudPrice'
import { useStorePromotion } from '../../../Store/useStorePromotions'

export const PriceAdmin = () => {
    const { prices, fetchPrice, setActivePrice } = useStorePrice()
    const {openViewModalAdminPrice, viewModalAdminPrice} = useStoreModal()
    const {productDetails, fetchProductDetails} = useStoreProductDetails()
    const {promotions, fetchPromotions} = useStorePromotion()

    useEffect(() => {
        fetchPrice()
    }, [])


    const handleOpen = (price : IPrice | null) => {
        setActivePrice(price)
        openViewModalAdminPrice()
    }

    const handleDelete = async( id : number) => {

        fetchProductDetails() // Renderizo los detalles del producto
        fetchPromotions() // Renderizo las promociones
        
        const existProductWithPrice = productDetails.some((productDetail) => productDetail.price.id === id)

        const existPromotionWhitPrice = promotions.some((promotion) => promotion.price.id === id)

        if (existPromotionWhitPrice) {
            ErrorAlert('Error', 'El pecio se encuentra asociado a una promoción') // Promocion con el precio
            return
        }

        if (existProductWithPrice) {
            ErrorAlert('Error', 'El precio se encuentra asociado a un producto') // Producto con el precio
            return
        }

        try {
            await deletePrice(id)
            fetchPrice()
        } catch (error:any) {
            console.log(error.message);
            
        }
    } 

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Precios</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Precio Venta</th>
                            <th>Precio Compra</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map(price => (
                            <tr key={price.id}>
                                <td>{price.id ?? ''}</td>
                                <td>${price.salesPrice}</td>
                                <td>${price.purchasePrice}</td>
                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(price)}>Editar</button>
                                        <button onClick={() => handleDelete(price.id!)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewModalAdminPrice && <div className={style.modalBackdrop}><ModalAdminPrice/></div>}
        </div>
    )
}
