import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { ListBranches } from '../../components/ListBranches/ListBranches'
import style from './ScreenBranches.module.css'

export const ScreenBranches = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <ListBranches/>
            <Footer/>
        </div>
    )
}