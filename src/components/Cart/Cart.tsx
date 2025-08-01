import { useEffect } from 'react'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { Card } from '../Card/Card'
import style from './Cart.module.css'
import { useStorePromotion } from '../../Store/useStorePromotions'

export const Cart = () => {

    const {products, fetchProduct} = useStoreProducts()
    const {promotions, fetchPromotions} = useStorePromotion()

    useEffect(() => {
        fetchProduct()
        fetchPromotions()
    },[])

    return (
        <div className={style.containerPrincipal}>

            <h1 className={style.title}>Carrito</h1>

            <div className={style.containerAdd}>
                <h2>Agregar algo más?</h2>
                <h2>Productos</h2>
                <div className={style.list}>

                    {products.map(p => (
                        
                        <Card products={p} promotion={null}/>
                    ))}
                </div>

                <h2>Promociones</h2>
                <div className={style.list}>
                    {promotions.map(p => (
                        <Card products={null} promotion={p}/>
                    ))}
                </div>
            </div>

        </div>
    )
}