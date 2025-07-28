import type { FC } from 'react'
import style from './Card.module.css'
import { useNavigate } from 'react-router'
import type { IProducts } from '../../types/IProducts'
import type { IPromotion } from '../../types/IPromotion'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'

interface ICard {
    products : IProducts | null,
    promotion : IPromotion | null
}

export const Card :FC<ICard> = ({products, promotion}) => {

    const navigate = useNavigate()
    const {setActiveProduct} = useStoreProducts()
    const {setActivePromotion} = useStorePromotion()

    // Funcion para verificar que es un producto
    const isProduct = (item : any): item is IProducts => {
        return item && 'category' in item 
    }

    // Funcion para verificar que es una promocion
    const isPromotion = (item : any) : item is IPromotion => {
        return item &&  'initDate' in item
    }

    // Funcion que envia a la pagina de pedir
    const handleClick = (item : IProducts | IPromotion | null) => {
        if (item === null) return

        navigate('/add-product')
        
        if (isProduct(item)){
            setActiveProduct(item)
            setActivePromotion(null)
        } else if (isPromotion(item)){
            setActivePromotion(item)
            setActiveProduct(null)
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <h3>{products !== null ? products.name : promotion?.name}</h3>
            <img src={products !== null ? products.image.url : promotion?.image.url} alt="" />

            <div className={style.containerButtons}>
                <button onClick={() => handleClick(products !== null ? products : promotion)}>Pedir</button>
            </div>
        </div>
    )
}