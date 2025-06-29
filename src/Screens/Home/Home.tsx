import style from './Home.module.css'
import { Header } from "../../components/Header/Header"
import { Footer } from '../../components/Footer/Footer'

export const Home = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <Footer/>
        </div>
    )
}