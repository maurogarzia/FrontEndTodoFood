import { useEffect } from 'react'

import style from './ListPromotions.module.css'

import { useStorePromotion } from '../../Store/useStorePromotions'
import { CardPromotion } from '../CardPromotion/CardPromotion'

export const ListPromotions = () => {

    const {promotions, fetchPromotions} = useStorePromotion()
    useEffect(() => {fetchPromotions()},[])


    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitle}>
                <h1>Promociones</h1>
            </div>

            

            <div className={style.promotions}>
                {promotions.map(p => (
                    <div >
                        <CardPromotion promotion={p}/>
                    </div>
                ))}
            </div>
        </div>
    )
}