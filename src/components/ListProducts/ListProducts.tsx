import { useEffect } from 'react'
import { useStoreProductDetails } from '../../Store/useStoreProductDetails'
import style from './ListProducts.module.css'
import { Card } from '../Card/Card'

export const ListProducts = () => {

    const {productDetails, fetchProductDetails} = useStoreProductDetails()

    useEffect(() => {fetchProductDetails()},[])


    return (
        <div className={style.containerPrincipal}>

            <div className={style.containerTitle}>
                <h1>Productos</h1>
            </div>

            <div className={style.containerFilter}>
                <button>Filtrar</button>
            </div>

            <div className={style.products}>
                {productDetails.map(p => (
                    <Card title={p.product.name} price={p.price} image={p.image}/>
                ))}
            </div>
        </div>
    )
}