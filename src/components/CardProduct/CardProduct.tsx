import type { FC } from 'react'
import style from './CardProduct.module.css'
import type { IProducts } from '../../types/IProducts'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'
import { handleNavigate } from '../../Routes/navigationService'

interface ICardProduct {
    products : IProducts | null,
}

export const CardProduct :FC<ICardProduct> = ({products}) => {

    
    const {setActiveProduct} = useStoreProducts()
    const {setActivePromotion} = useStorePromotion()

    // Funcion que envia a la pagina de pedir
    const handleClick = (item : IProducts | null) => {
        if (item === null) return

        setActiveProduct(item)
        setActivePromotion(null)

        // guardo en localStorage
        localStorage.setItem("productOption", JSON.stringify(item))
        localStorage.removeItem("promotionOption") // me aseguro de limpiar la promo

        handleNavigate('/add-product')
    }


    return(
        <div className={style.containerPrincipal}>
            <h3>{ products?.name}</h3>
            <img src={products?.image.url} alt="" />

            <div className={style.containerButtons}>
                <button onClick={() => handleClick(products)}>Pedir</button>
            </div>
        </div>
    )
}