import styles from './Header.module.css'

export const Header = () => {
    return(
        <div className={styles.containerPrincipal}>
            <header>
                <nav className={styles.containerItems}>
                    <h1>TodoFood</h1>

                    <div className={styles.containerNav}>
                        <p>Promociones</p>
                        <p>Productos</p>
                        <p>Sucursales</p>
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