
import styles from './Header.module.css'
import { useEffect, useState } from 'react'
import { isLogged } from '../../utils/isLogged'
import { useStoreModal } from '../../Store/useStoreModal'
import { handleNavigate } from '../../Routes/navigationService'

import { Rol } from '../../types/enums/Rol'
import { useStoreUser } from '../../Store/useStoreUsers'




export const Header = () => {
    
    const [menu, setMenu] = useState<boolean>(false) // Estado que controla el menu responsivo
    const {openViewModalRegister} = useStoreModal()
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const {loginUser} = useStoreUser()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (loginUser === null || !token) return
        if (loginUser?.rol === Rol.admin){
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
        
    },[])

    // Funcion que verifica si estas logueado
    const handleIsLogged = (route : string) => {
        if (isLogged()) {
            handleNavigate(route)
        } else {
            openViewModalRegister()
        }
    }

    // Funcion para desplegar menu responsivo
    const handleDisplayMenu = (option : boolean) => {
        setMenu(option)
    }

    return(
        <div className={styles.containerPrincipal}>
            <header>
                <nav className={styles.containerItems}>
                    <h1 onClick={() => handleNavigate('/')}>TodoFood</h1>

                    {/* menu para responsivo */}
                    <div className={styles.menu}>
                        <span onClick={() => handleDisplayMenu(true)} className="material-symbols-outlined">
                            menu
                        </span>

                    </div>

                    <div className={styles.containerNav}>
                        <p onClick={() => handleNavigate('/promotions')}>Promociones</p>
                        <p onClick={() => handleNavigate('/products')}>Productos</p>
                        <p onClick={() => handleNavigate('/branches')}>Sucursales</p>
                    </div>

                    <div className={styles.searchAndProfile}>
                        {isAdmin && 
                            <span onClick={() => handleNavigate('/admin')} className="material-symbols-outlined">
                                admin_panel_settings
                            </span>}

                        {/* Barra de busqueda */}
                        <input type="text" name="" id="" placeholder='Buscar'/>

                        {/* Lupa */}
                        <span className="material-symbols-outlined">
                            search
                        </span>

                        {/* Circulo del perfil */}
                        <span onClick={() => handleIsLogged('/profile')} className="material-symbols-outlined">
                            account_circle
                        </span>

                        {/* Carrito */}
                        <span onClick={() => handleIsLogged('/cart')} className="material-symbols-outlined">
                            shopping_cart
                        </span>

                    </div>

                {menu && 
                
                    // Menu responsivo
                    <div className={styles.containerMenu}>
                        <div className={styles.containerSelection}>
                            <div className={styles.containerSearchMenu}>
                                <input type="" name="" id="" placeholder='Buscar'/>{/* Lupa */}
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                            </div>
                            
                            <p onClick={() => handleNavigate('/promotions')}>Promociones</p>
                            <p onClick={() => handleNavigate('/products')}>Productos</p>
                            <p onClick={() => handleNavigate('/branches')}>Sucursales</p>
                            <p onClick={() => handleNavigate('/profile')}>Perfil</p>
                            <p onClick={() => handleNavigate('/cart')}>Carrito</p>
                            {isAdmin && <p onClick={() => handleNavigate('/admin')}>Admin</p>}

                        </div>

                        <div className={styles.containerButton}>
                            <button onClick={() => handleDisplayMenu(false)}>Cerrar</button>
                        </div>
                    </div>
                }

                </nav>
            </header>
        </div>
    )
}