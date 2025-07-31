
import styles from './Footer.module.css'

export const Footer = () => {
    return(
        <footer className={styles.containerPrincipal}>
            <div className={styles.title}>
                <h1>TodoFood</h1>
            </div>

            <div className={styles.column}>
                <h2>Conócenos</h2>
                <p>Locales</p>
                <p>Franquicias</p>
                <p>Sugerencias y Reclamos</p>
                <p>Términos y condiciones</p>
            </div>

            <div className={styles.column}>
                <h2>Redes Sociales</h2>
                <div className={styles.social}>
                    <span className="fab fa-instagram"></span>
                    <p>@todofood</p>
                </div>

                <div className={styles.social}>
                    <span className="fab fa-facebook"></span>
                    <p>todofood</p>
                </div>

                <div className={styles.social}>
                    <span className="fab fa-whatsapp"></span>
                    <p>2616938666</p>
                </div>
            </div>

            <div className={styles.column}>
                <h1>Mi Cuenta</h1>
                <a href="">Iniciar Sesión</a>
                <a href="">Pedir</a>
            </div>
        </footer>
    )
}