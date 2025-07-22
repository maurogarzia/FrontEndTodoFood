import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { ListPromotions } from '../../components/ListPromotions/ListPromotions'
import style from './ScreenPromotions.module.css'

export const ScreenPromotions = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <ListPromotions/>
            <Footer/>
        </div>
    )
}