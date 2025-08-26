import { type FC } from 'react'
import style from './DropdownSearch.module.css'
import type { IProducts } from '../../types/IProducts'
import type { IPromotion } from '../../types/IPromotion'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'
import { handleNavigate } from '../../Routes/navigationService'


interface IDropdownSearch {
    listProducts : IProducts[]
    listPromotions : IPromotion[]
}

export const DropdownSearch : FC<IDropdownSearch>  = ({listProducts, listPromotions}) => {


    const {setActiveProduct} = useStoreProducts()
    const {setActivePromotion} = useStorePromotion()

    // Funcion que envia a la pagina de pedir de productos
        const handleClickProduct = (item : IProducts | null) => {
            if (item === null) return
    
            setActiveProduct(item)
            setActivePromotion(null)
    
            // guardo en localStorage
            localStorage.setItem("productOption", JSON.stringify(item))
            localStorage.removeItem("promotionOption") // me aseguro de limpiar la promo
    
            handleNavigate('/add-product')
        }

         // Funcion que envia a la pagina de pedir de promociones
    const handleClickPromotion = (item : IPromotion | null) => {
        if (item === null) return

        setActiveProduct(null)
        setActivePromotion(item)

        // guardo en localStorage
        localStorage.setItem("promotionOption", JSON.stringify(item))
        localStorage.removeItem("productOption") // me aseguro de limpiar el producto
        handleNavigate('/add-product')
    }

    return (
        <div className={style.containerPrincipal}>
            {listProducts.length < 0 && listPromotions.length < 0 ? (
                <div className={style.containerItem}>
                    <p>No hay coincidencias</p>
                </div>
            ) 
            
            : 
            
            (
                <div className={style.containerItem}>
                    {listProducts.length === 0 ? null : listProducts.map((l) => (
                        <div onClick={() => handleClickProduct(l)} className={style.item}>
                            <p>{l.name}</p>
                        </div>
                    ))}
                    {listPromotions.length === 0 ? null : listPromotions.map((l) => (
                        <div onClick={() => handleClickPromotion(l)} className={style.item}>
                            <p>{l.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}