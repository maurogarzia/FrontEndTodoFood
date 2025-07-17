import style from './Home.module.css'
import { Header } from "../../components/Header/Header"
import { Footer } from '../../components/Footer/Footer'
import { MainScreen } from '../MainScreen/MainScreen'

export const Home = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <div style={{"height" : "100%"}}>
                <MainScreen/>
            </div>
            <Footer/>
        </div>
    )
}