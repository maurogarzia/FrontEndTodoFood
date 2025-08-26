import style from './MainScreen.module.css'
import image from '../../assets/image.png'
import { useStorePromotionDetails } from '../../Store/useStorePromotionDetails'
import { useEffect, useState } from 'react'
import image1 from '../../assets/imagesCarrusel/comida-chatarra-hamburguesas-caseras-de-carne-de-res-sobre-fondo-de-madera-vintage.webp'
import image2 from '../../assets/imagesCarrusel/depositphotos_254299240-stock-photo-tasty-meat-burgers-melted-cheese.webp'
import image3 from '../../assets/imagesCarrusel/tres-mini-hamburguesas-queso-carne_960508-6.webp'
import { CardPromotion } from '../CardPromotion/CardPromotion'




export const MainScreen = () => {

    
    const {fetchPromotionsDetails, promotionsDetails} = useStorePromotionDetails()

    useEffect(() => {
        fetchPromotionsDetails()
    },[])    

    
    const [index, setIndex] = useState<number>(0) // Estado para controlar el indice del carrusel
    
    const today = new Date()

    const filtered = promotionsDetails.filter((p) => {
        const promotionDate = new Date(p.promotion.finallyDate)
        return promotionDate >= today
})
    
    
    
    // UseEffect para que cambie de imagen cada 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % carruselArray.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])
    
    
    // Array de imagenes para el carrusel
    const carruselArray = [
        image1,
        image2,
        image3,
    ]
    
    // Funcion que controla el movimiento del carrusel
    const handleIndex = (number : number) => {
        setIndex(number)
        
    }
    
    
    return (
        <div className={style.containerPrincipal}>

            

            <div className={style.image}>
                <img src={image} alt="" />
                <p>¡Bocado de felicidad!</p>
            </div>
            
            {/* Carrusel aqui */}
            <div className={style.carrusel}>
                <img key={index}  src={carruselArray[index]} alt="" />

                <div className={style.buttonCarrusel}>
                    <button className={index === 0 ? style.selectedButton : style.notSelectedBUtton} onClick={() => handleIndex(0)}></button>
                    <button className={index === 1 ? style.selectedButton : style.notSelectedBUtton} onClick={() => handleIndex(1)}></button>
                    <button className={index === 2 ? style.selectedButton : style.notSelectedBUtton} onClick={() => handleIndex(2)}></button>
                </div>

            </div>

            {/* Promos */}
            <h1>Promos del mes</h1>        
            
            <div className={style.containerCard}>
                {filtered.map((f) => (
                    <CardPromotion promotion={f.promotion}/>
                ))}
                
            </div>
            
        </div>
    )
}