import style from './MainScreen.module.css'
import image from '../../assets/image.png'
import { Card } from '../../components/Card/Card'
import { useStorePromotionDetails } from '../../Store/useStorePromotionDetails'
import { useEffect } from 'react'

export const MainScreen = () => {

    const {promotionsDetails, fetchPromotionsDetails} = useStorePromotionDetails()

    useEffect(() => {
        fetchPromotionsDetails()
    },[])
    
    return (
        <div className={style.containerPrincipal}>

            <div className={style.containerFilter}>
                <button>Filtrar</button>
            </div>

            <div className={style.image}>
                <img src={image} alt="" />
                <p>Pide Aquí</p>
            </div>
            
            {/* Carrusel aqui */}


            <h1>Promos del día</h1>        
            
            {promotionsDetails.map((detail) => (
                <div className={style.containerCard}>
                    <Card price={detail.price} title={detail.promotion.name} image={detail.promotion.image}/>
                </div>
            ))}
        </div>
    )
}