import { useEffect } from 'react'
import { useStorePromotionDetails } from '../../Store/useStorePromotionDetails'
import style from './ListPromotions.module.css'
import { Card } from '../Card/Card'

export const ListPromotions = () => {

    const {promotionsDetails, fetchPromotionsDetails} = useStorePromotionDetails()
    useEffect(() => {fetchPromotionsDetails()},[])


    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitle}>
                <h1>Promociones</h1>
            </div>

            <div className={style.containerFilter}>
                <button>Filtrar</button>
            </div>

            <div className={style.promotions}>
                {promotionsDetails.map(p => (
                    <div >
                        <Card products={null} promotion={p}/>
                    </div>
                ))}
            </div>
        </div>
    )
}