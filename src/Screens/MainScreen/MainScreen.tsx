import style from './MainScreen.module.css'
import image from '../../assets/image.png'
import { Card } from '../../components/Card/Card'
import { useStorePromotionDetails } from '../../Store/useStorePromotionDetails'
import { useEffect, useState } from 'react'
import image1 from '../../assets/imagesCarrusel/comida-chatarra-hamburguesas-caseras-de-carne-de-res-sobre-fondo-de-madera-vintage.webp'
import image2 from '../../assets/imagesCarrusel/depositphotos_254299240-stock-photo-tasty-meat-burgers-melted-cheese.webp'
import image3 from '../../assets/imagesCarrusel/depositphotos_254299240-stock-photo-tasty-meat-burgers-melted-cheese.webp'


export const MainScreen = () => {

    const {promotionsDetails, fetchPromotionsDetails} = useStorePromotionDetails()

    useEffect(() => {
        fetchPromotionsDetails()
    },[])

    const [index, setIndex] = useState(0)
    
    // Array de imagenes para el carrusel
    const carruselArray = [
        image1,
        image2,
        image3
    ]
    
    const prevSlide = () => {
        setIndex((prev) => (prev === 0) ? carruselArray.length -1 : prev -1)
    }

    const nextSlide = () => {
        setIndex((prev) => (prev === carruselArray.length - 1 ? 0 : prev + 1))
    }
    
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
            <div className={style.carrusel}>
                <img src={carruselArray[index]} alt="" />

                <div className={style.buttonCarrusel}>
                    <button onClick={prevSlide}>
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                    </button>

                    <button onClick={nextSlide}>
                        <span className="material-symbols-outlined">
                            arrow_forward
                        </span> 
                    </button>
                </div>

            </div>

            {/* Promos */}
            <h1>Promos del día</h1>        
            
            {promotionsDetails.map((detail) => (
                <div className={style.containerCard}>
                    <Card price={detail.price} title={detail.promotion.name} image={detail.promotion.image}/>
                </div>
            ))}
        </div>
    )
}