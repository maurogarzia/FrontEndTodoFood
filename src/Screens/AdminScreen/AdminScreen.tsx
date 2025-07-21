import { AddressAdmin } from '../../components/AdminComponents/AddressAdmin/AddressAdmin'
import { AsideAdmin } from '../../components/AdminComponents/AsideAdmin/AsideAdmin'
import { BranchAdmin } from '../../components/AdminComponents/BarnchAdmin/BranchAdmin'
import { BillAdmin } from '../../components/AdminComponents/BillAdmin/BillAdmin'
import { CategoryAdmin } from '../../components/AdminComponents/CategoryAdmin/CategoryAdmin'
import { CountryAdmin } from '../../components/AdminComponents/CountryAdmin/CountryAdmin'
import { ImagesAdmin } from '../../components/AdminComponents/ImagesAdmin/ImagesAdmin'
import { LocalityAdmin } from '../../components/AdminComponents/LocalityAdmin/LocalityAdmin'
import { ProductsAdmin } from '../../components/AdminComponents/ProductsAdmin/ProductsAdmin'
import { ProductsDetailsAdmin } from '../../components/AdminComponents/ProductsDetailsAdmin/ProductsDetailsAdmin'
import { PromotionAdmin } from '../../components/AdminComponents/PromotionAdmin/PromotionAdmin'
import { PromotionDetailsAdmin } from '../../components/AdminComponents/PromotionDetailsAdmin/PromotionDetailsAdmin'

import { ProvinceAdmin } from '../../components/AdminComponents/ProvinceAdmin/ProvinceAdmin'
import { SizeAdmin } from '../../components/AdminComponents/SizeAdmin/SizeAdmin'
import { UnitaryDetailsAdmin } from '../../components/AdminComponents/UnitaryDetailsAdmin/UnitaryDetailsAdmin'
import { UserAdmin } from '../../components/AdminComponents/UserAdmin/UserAdmin'
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
                {page === 'address' && <AddressAdmin/>}
                {page === 'products' && <ProductsAdmin/>}
                {page === 'productsDetails' && <ProductsDetailsAdmin/>}
                {page === 'images' && <ImagesAdmin/>}
                {page === 'users' && <UserAdmin/>}
                {page === 'branches' && <BranchAdmin/>}
                {page === 'sizes' && <SizeAdmin/>}
                {page === 'categories' && <CategoryAdmin/>}
                {page === 'bills' && <BillAdmin/>}
                {page === 'promotions' && <PromotionAdmin/>}
                {page == 'promotionDetails' && <PromotionDetailsAdmin/>}
                {page == 'unitaryDetails' && <UnitaryDetailsAdmin/>}
            </div>
            <Footer/>
        </div>
    )
}