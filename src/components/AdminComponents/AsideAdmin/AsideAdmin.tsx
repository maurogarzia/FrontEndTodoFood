import { useStoreAdmin } from '../../../Store/useStoreAdmin'
import style from './AsideAdmin.module.css'

export const AsideAdmin = () => {

    const {setPage} = useStoreAdmin()

    return (
        <div className={style.containerPrincipal} >
            <p onClick={() => setPage('country')}>País</p>
            <p onClick={() => setPage('province')}>Provincia</p>
            <p onClick={() => setPage('locality')}>Localidad</p>
            <p onClick={() => setPage('address')}>Dirección</p>
            <p onClick={() => setPage('products')}>Productos</p>
            <p onClick={() => setPage('productsDetails')}>Detalle Producto</p>
            <p onClick={() => setPage('promotions')}>Promociones</p>
            <p onClick={() => setPage('images')}>Imágenes</p>
            <p onClick={() => setPage('users')}>Usuarios</p>
            <p onClick={() => setPage('branches')}>Sucursales</p>
            <p onClick={() => setPage('sizes')}>Tamaños</p>
            <p onClick={() => setPage('categories')}>Categorías</p>
            <p onClick={() => setPage('bills')}>Factura</p>
            <p onClick={() => setPage('prices')}>Precios</p>

        </div>
    )
}