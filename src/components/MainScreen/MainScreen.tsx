import style from './MainScreen.module.css'
import image from '../../assets/image.png'
import { Card } from '../Card/Card'
import { useStorePromotionDetails } from '../../Store/useStorePromotionDetails'
import { useEffect, useState } from 'react'
import image1 from '../../assets/imagesCarrusel/comida-chatarra-hamburguesas-caseras-de-carne-de-res-sobre-fondo-de-madera-vintage.webp'
import image2 from '../../assets/imagesCarrusel/depositphotos_254299240-stock-photo-tasty-meat-burgers-melted-cheese.webp'
import image3 from '../../assets/imagesCarrusel/tres-mini-hamburguesas-queso-carne_960508-6.webp'


export const MainScreen = () => {

    const {promotionsDetails, fetchPromotionsDetails} = useStorePromotionDetails()

    useEffect(() => {
        fetchPromotionsDetails()
    },[])

    const [index, setIndex] = useState<number>(0)
    
    // UseEffect para que cambie de imagen cada 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % carruselArray.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])
    
    console.log(index);
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
                    <button onClick={() => handleIndex(0)}></button>
                    <button onClick={() => handleIndex(1)}></button>
                    <button onClick={() => handleIndex(2)}></button>
                </div>

            </div>

            {/* Promos */}
            <h1>Promos del día</h1>        
            
            <div className={style.containerCard}>
                {promotionsDetails.map((detail) => (
                    <div>
                        <Card price={detail.price} title={detail.promotion.name} image={detail.promotion.image}/>
                    </div>
                ))}
            </div>
        </div>
    )
}