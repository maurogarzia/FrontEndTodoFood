import { useEffect } from 'react'
import { useStorePromotionDetails } from '../../Store/useStorePromotionDetails'
import style from './ListPromotions.module.css'
import { Card } from '../Card/Card'

export const ListPromotions = () => {

    const {promotionsDetails, fetchPromotionsDetails} = useStorePromotionDetails()

    useEffect(() => {fetchPromotionsDetails()},[])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Promociones</h1>
                <button>Filtrar</button>
            </div>

            <div className={style.promotions}>
                {promotionsDetails.map(p => (
                    <Card price={p.price} title={p.promotion.name} image={p.promotion.image}/>
                ))}
            </div>
        </div>
    )
}