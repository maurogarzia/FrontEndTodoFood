import { AddProducts } from '../../components/AddProducts/AddProducts'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import style from './ScreenAddProducts.module.css'

export const ScreenAddProducts = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <AddProducts/>
            <Footer/>
        </div>
    )
}