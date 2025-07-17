import style from './MainScreen.module.css'
import image from '../../assets/image.png'

export const MainScreen = () => {
    return (
        <div className={style.containerPrincipal}>

            <div className={style.containerFilter}>
                <button>Filtrar</button>
            </div>

            
            <div className={style.image}>
                <img src={image} alt="" />
            </div>
            

        </div>
    )
}