import { handleNavigate } from '../../Routes/navigationService'
import style from './Unauthorized.module.css'

export const Unauthorized = () => {
    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerButton}>
                <button onClick={() => handleNavigate('/')}>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </button>
            </div>

            <h1>ACCESO DENEGADO</h1>
            <p>No tiene los permisos necesarios para acceder a esta página</p>  
        </div>
    )
}