import { useState } from 'react'
import { useStoreAdmin } from '../../../Store/useStoreAdmin'
import style from './AsideAdmin.module.css'

export const AsideAdmin = () => {

    const {setPage} = useStoreAdmin()
    const [aside, setAside] = useState(false) // Estado para el aside responsivo

    return (
        <div className={style.containerPrincipal} >
            <div className={style.containerOpenMenu}>
                <span onClick={() => setAside(true)} className="material-symbols-outlined">
                    menu_open
                </span>
            </div>


            <div className={style.containerAside}>
                <p onClick={() => setPage('country')}>País</p>
                <p onClick={() => setPage('province')}>Provincia</p>
                <p onClick={() => setPage('locality')}>Localidad</p>
                <p onClick={() => setPage('address')}>Dirección</p>
                <p onClick={() => setPage('products')}>Productos</p>
                <p onClick={() => setPage('productsDetails')}>Detalle Producto</p>
                <p onClick={() => setPage('promotions')}>Promociones</p>
                <p onClick={() => setPage('promotionDetails')}>Detalle Promoción</p>
                <p onClick={() => setPage('unitaryDetails')}>Detalles Unitarios</p>
                <p onClick={() => setPage('images')}>Imágenes</p>
                <p onClick={() => setPage('users')}>Usuarios</p>
                <p onClick={() => setPage('branches')}>Sucursales</p>
                <p onClick={() => setPage('sizes')}>Tamaños</p>
                <p onClick={() => setPage('categories')}>Categorías</p>
                <p onClick={() => setPage('bills')}>Factura</p>
            </div>

            {aside && 
                <div className={style.modalBackdrop}>
                    <div className={style.containerDisplay}>
                        <p onClick={() => setPage('country')}>País</p>
                        <p onClick={() => setPage('province')}>Provincia</p>
                        <p onClick={() => setPage('locality')}>Localidad</p>
                        <p onClick={() => setPage('address')}>Dirección</p>
                        <p onClick={() => setPage('products')}>Productos</p>
                        <p onClick={() => setPage('productsDetails')}>Detalle Producto</p>
                        <p onClick={() => setPage('promotions')}>Promociones</p>
                        <p onClick={() => setPage('promotionDetails')}>Detalle Promoción</p>
                        <p onClick={() => setPage('unitaryDetails')}>Detalles Unitarios</p>
                        <p onClick={() => setPage('images')}>Imágenes</p>
                        <p onClick={() => setPage('users')}>Usuarios</p>
                        <p onClick={() => setPage('branches')}>Sucursales</p>
                        <p onClick={() => setPage('sizes')}>Tamaños</p>
                        <p onClick={() => setPage('categories')}>Categorías</p>
                        <p onClick={() => setPage('bills')}>Factura</p>

                        
                        <button onClick={() => setAside(false)}>Cerrar</button>
                        
                    </div>
                    
                </div>
            }

        </div>
    )
}