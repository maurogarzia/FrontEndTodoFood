import { Cart } from '../../components/Cart/Cart'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import style from './ScreenCart.module.css'

export const ScreenCart = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <Cart/>
            <Footer/>
        </div>
    )
}