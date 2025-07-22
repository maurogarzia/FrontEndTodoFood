import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { ListProducts } from '../../components/ListProducts/ListProducts'
import style from './ScreenProducts.module.css'

export const ScreenProducts = () => {

    

    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <ListProducts/>
            <Footer/>
        </div>
    )
}