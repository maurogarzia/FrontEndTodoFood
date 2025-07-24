import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Profile } from '../../components/Profile/Profile'
import style from './ScreenProfile.module.css'

export const ScreenProfile = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <Profile/>
            <Footer/>
        </div>
    )
}