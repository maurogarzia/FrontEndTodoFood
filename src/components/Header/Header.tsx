import { useNavigate } from 'react-router'
import styles from './Header.module.css'
import { useState } from 'react'

export const Header = () => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState<boolean>(false) // Estado que controla el menu responsivo

    // fuuncion para navegar entre paginas
    const handleNavigate = (parameter : string) => {
        navigate(parameter)
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
                        {/* Barra de busqueda */}
                        <input type="text" name="" id="" placeholder='Buscar'/>

                        {/* Lupa */}
                        <span className="material-symbols-outlined">
                            search
                        </span>

                        {/* Circulo del perfil */}
                        <span onClick={() => handleNavigate('/profile')} className="material-symbols-outlined">
                            account_circle
                        </span>

                        {/* Carrito */}
                        <span className="material-symbols-outlined">
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
                            <p>Carrito</p>

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