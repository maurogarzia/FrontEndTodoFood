import type { FC } from 'react'
import style from './CardPromotion.module.css'

import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'
import type { IPromotion } from '../../types/IPromotion'
import { handleNavigate } from '../../Routes/navigationService'

interface ICardPromotion {
    promotion : IPromotion | null,
}

export const CardPromotion :FC<ICardPromotion> = ({promotion}) => {

    
    const {setActiveProduct} = useStoreProducts()
    const {setActivePromotion} = useStorePromotion()

    // Funcion que envia a la pagina de pedir
    const handleClick = (item : IPromotion | null) => {
        if (item === null) return

        setActiveProduct(null)
        setActivePromotion(item)

        // guardo en localStorage
        localStorage.setItem("promotionOption", JSON.stringify(item))
        localStorage.removeItem("productOption") // me aseguro de limpiar el producto
        handleNavigate('/add-product')
    }

    return(
        <div className={style.containerPrincipal}>
            <h3>{ promotion?.name}</h3>
            <img src={promotion?.image.url} alt="" />

            <div className={style.containerButtons}>
                <button onClick={() => handleClick(promotion)}>Pedir</button>
            </div>
        </div>
    )
}