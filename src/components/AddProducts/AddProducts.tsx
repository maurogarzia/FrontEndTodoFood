import { useEffect, useState } from 'react'

import style from './AddProducts.module.css'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'
import { useStoreProductDetails } from '../../Store/useStoreProductDetails'
import type { IProductsDetails } from '../../types/IProductsDetails'

export const AddProducts = () => {

    const {activeProduct} = useStoreProducts()
    const {activePromotion} = useStorePromotion()
    const {productDetails, fetchProductDetails} = useStoreProductDetails()
    const {drinks, accompaniment, fetchAccompaniment, fetchDrinks} = useStoreProducts()


    const [detailsSize, setDetailsSize] = useState<IProductsDetails[]>()
    const [detailsDrinks, setDetailsDrinks] = useState<IProductsDetails[]>()
    const [detailsAccompaniment, setDetailsAccompaniments] = useState<IProductsDetails[]>()
    const [counter, setCounter] = useState<number>(0) // Estado para el contador 

    useEffect(() => {
        fetchProductDetails()
        fetchAccompaniment()
        fetchDrinks()

        // Busco los detalles degun el tamaño
        const searchDetailsSize = () => {
            const handleDetails = productDetails.filter(p => p.product.id === activeProduct?.id)
            setDetailsSize(handleDetails)
        }

        // Busco detalles segun la bebida
        const searchDrinks = () => {
            const handleDetailsDrink = productDetails.filter(p => 
                drinks.some(d => d.id === p.product.id)
            )
            setDetailsDrinks(handleDetailsDrink)
        }

        // Busco detalles segun acompañamiento
        const searchAccompaniment = () => {
            const handleDetailsAccompaniment = productDetails.filter(p => 
                accompaniment.some(a => a.id === p.product.id)
            )
            setDetailsAccompaniments(handleDetailsAccompaniment)
        }
        searchDetailsSize()
        searchDrinks()
        searchAccompaniment()
    },[activeProduct])

    
    // Funcion para manejar el contador
    const handleCounter = (action : string) => {
        if (action === 'add'){
            setCounter(counter + 1)
        } else if (action === 'remove'){
            if (counter === 0) return
            setCounter(counter - 1)
        }
    }

    
    console.log(drinks);
    
    
    
    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTop}>

                <div className={style.conainerImage}>
                    <img src={activeProduct !== null ? activeProduct.image.url : activePromotion?.image.url} alt="" />

                    <div className={style.quantityAndPrice}>

                        <div className={style.counter}>
                            <span onClick={() => handleCounter('remove')} className="material-symbols-outlined">remove</span>
                            <p>{counter}</p>
                            <span onClick={() => handleCounter('add')} className="material-symbols-outlined">add</span>
                        </div>

                        <div className={style.price}>
                            <p>$ </p>
                        </div>
                        
                    </div>
                    <button>Añadir al Carrito</button>
                </div>

                <div className={style.containerData}>
                    <h1>{activeProduct !== null ? activeProduct.name : activePromotion?.name}</h1>
                    <p>{activeProduct !== null ? activeProduct.description : activePromotion?.description}</p>

                    <div className={style.containerOption}>
                        <h2>Seleccionar Tamaño</h2>
                        {detailsSize?.map(p => (
                            <button>{p.size.name}</button>
                        ))}
                    </div>
                </div>

            </div>
            <div className={style.containerBottom}>
                <div className={style.containerOption}>
                    <h2>Seleccionar Bebidas</h2>
                    {detailsDrinks?.map(d => (
                        <button>{d.product.name} ({d.size.name})</button>
                    ))}
                </div>

                <div className={style.containerOption}>
                    <h2>Seleccionar Acompañamientos</h2>
                    {detailsAccompaniment?.map(a =>
                        <button>{a.product.name} ({a.size.name})</button>
                    )}
                </div>
            </div>
        </div>
    )
} 