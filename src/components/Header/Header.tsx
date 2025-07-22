import { useNavigate } from 'react-router'
import styles from './Header.module.css'

export const Header = () => {
    const navigate = useNavigate()

    const handleNavigate = (parameter : string) => {
        navigate(parameter)
    }

    return(
        <div className={styles.containerPrincipal}>
            <header>
                <nav className={styles.containerItems}>
                    <h1 onClick={() => handleNavigate('/')}>TodoFood</h1>

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
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>

                    </div>

                </nav>
            </header>
        </div>
    )
}