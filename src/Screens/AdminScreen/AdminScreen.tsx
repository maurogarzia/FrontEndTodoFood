import { AsideAdmin } from '../../components/AdminComponents/AsideAdmin/AsideAdmin'
import { CountryAdmin } from '../../components/AdminComponents/CountryAdmin/CountryAdmin'
import { LocalityAdmin } from '../../components/AdminComponents/LocalityAdmin/LocalityAdmin'
import { ProvinceAdmin } from '../../components/AdminComponents/ProvinceAdmin/ProvinceAdmin'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { useStoreAdmin } from '../../Store/useStoreAdmin'
import style from './AdminScreen.module.css'

export const AdminScreen = () => {

    const {page} = useStoreAdmin()

    return(
        <div className={style.containerPrincipal}>
            <Header/>
            <div style={{"height" : "100vh", "display" : "flex"}}>
                <AsideAdmin/>
                {page === 'admin' && <div className={style.containerAdmin}><h1>ADMINISTRACIÓN</h1></div>}
                {page === 'country' && <CountryAdmin/>}
                {page === 'province' && <ProvinceAdmin/>}
                {page === 'locality' && <LocalityAdmin/>}
            </div>
            <Footer/>
        </div>
    )
}