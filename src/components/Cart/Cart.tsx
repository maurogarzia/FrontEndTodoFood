import { useEffect, useState } from 'react'
import { useStoreProducts } from '../../Store/useStoreProducts'

import style from './Cart.module.css'
import { useStorePromotion } from '../../Store/useStorePromotions'
import { useStoreCart } from '../../Store/useStoreCart'
import { CardProduct } from '../CardProduct/CardProduct'
import { CardPromotion } from '../CardPromotion/CardPromotion'
import type { IProductsDetails } from '../../types/IProductsDetails'
import type { IPromotionDetails } from '../../types/IPromotionDetails'


export const Cart = () => {

    const {products, fetchProduct} = useStoreProducts()
    
    const {promotions, fetchPromotions} = useStorePromotion()
    const {listCart, deleteProduct, emptyCart} = useStoreCart()

    const [total, setTotal] = useState<number>()
    const [subTotal, setSubTotal] = useState<number>()

    useEffect(() => {
        fetchProduct()
        fetchPromotions()
    },[])


    useEffect(() => {
        let suma = 0
        listCart.forEach(l => suma += l.price)

        setSubTotal(suma)

        const iva = suma * 0.21
        setTotal(suma + iva)

    }, [listCart]) 


    


    return (
        <div className={style.containerPrincipal}>

            <h1 className={style.title}>Carrito</h1>
            
            <div className={style.containerCart}>
                {listCart.length < 1 

                ?
                
                <p className={style.emptyCart}>El Carrito esta vacío</p>
            
                :

                <div className={style.containerObject}>
                    {listCart.map((list) => (
                        list.type === 'product'
                        ? 
                        <div className={style.object}>
                            <p>{list.quantity}</p>
                            <p>{(list.detail as IProductsDetails).product.name} {(list.detail as IProductsDetails).size.name}</p>
                            <p>${list.price}</p>
                            <span onClick={() => deleteProduct(list)} className="material-symbols-outlined">
                                delete
                            </span>
                        </div>
                        :
                        <div className={style.object}>
                            <p>{list.quantity}</p>
                            <p>{(list.detail as IPromotionDetails).promotion.name}</p>
                            <p>${list.price}</p>
                            <span onClick={() => deleteProduct(list)} className="material-symbols-outlined">
                                delete
                            </span>
                        </div>
                    ))}
                </div>
                }

                <div className={style.containerTotal}>
                    <h3>Subtotal</h3>
                    <p>{subTotal}</p>
                    <h2>Total</h2>
                    <p>{total}</p>

                </div>
                
            </div>

            <div className={style.containerButton}>
                <button onClick={emptyCart}>Vaciar Carrito</button>
            </div>

            <div className={style.containerAdd}>
                <h2>Agregar algo más?</h2>
                <h2>Productos</h2>
                <div className={style.list}>

                    {products.map(p => (
                        
                        <CardProduct products={p}/>
                    ))}
                </div>

                <h2>Promociones</h2>
                <div className={style.list}>
                    {promotions.map(p => (
                        <CardPromotion promotion={p}/>
                    ))}
                </div>
            </div>
            
        </div>
    )
}