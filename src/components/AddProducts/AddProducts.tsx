import { useEffect, useState } from 'react'

import style from './AddProducts.module.css'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'
import { useStoreProductDetails } from '../../Store/useStoreProductDetails'
import type { IProductsDetails } from '../../types/IProductsDetails'
import { useStoreSize } from '../../Store/useStoreSize'

export const AddProducts = () => {

    const {activeProduct} = useStoreProducts()
    const {activePromotion} = useStorePromotion()
    const {productDetails, fetchProductDetails} = useStoreProductDetails()
    const {fetchSize} = useStoreSize()


    const [detailsSize, setDetailsSize] = useState<IProductsDetails[]>()
    const [price, setPrice] = useState<number>(0)
    const [counter, setCounter] = useState<number>(1) // Estado para el contador 


    useEffect(() => {
        fetchSize()
        fetchProductDetails()

        // Busco los detalles degun el tamaño
        const searchDetailsSize = () => {
            const handleDetails = productDetails.filter(p => p.product.id === activeProduct?.id)
            setDetailsSize(handleDetails)
        }
        searchDetailsSize()
    },[])

    
    // Funcion para manejar el contador
    const handleCounter = (action : string) => {
        if (action === 'add'){
            setCounter(counter + 1)
            handlePrice(price)
        } else if (action === 'remove'){
            if (counter === 1) return
            setCounter(counter - 1)
            handlePrice(price)
        }
    }

    const handlePrice = (priceDetail : number) => {
        console.log(priceDetail);
        setPrice(counter * priceDetail)
    }
    
    
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
                            <p>$ {price}</p>
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
                                <button key={p.id} onClick={() => handlePrice(p.price)}>{p.size.name}</button>        
                            ))}
                        
                    </div>
                </div>

            </div>
            
        </div>
    )
} 