import { useEffect } from 'react'
import { useStoreProducts } from '../../Store/useStoreProducts'

import style from './Cart.module.css'
import { useStorePromotion } from '../../Store/useStorePromotions'
import { useStoreCart } from '../../Store/useStoreCart'
import { CardProduct } from '../CardProduct/CardProduct'
import { CardPromotion } from '../CardPromotion/CardPromotion'


export const Cart = () => {

    const {products, fetchProduct} = useStoreProducts()
    const {promotions, fetchPromotions} = useStorePromotion()
    const {listProducts} = useStoreCart()

    useEffect(() => {
        fetchProduct()
        fetchPromotions()
    },[])

    return (
        <div className={style.containerPrincipal}>

            <h1 className={style.title}>Carrito</h1>
            <div className={style.containerCart}>
                {listProducts.map(p => (
                    <p>{p.id}</p>
                ))}
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