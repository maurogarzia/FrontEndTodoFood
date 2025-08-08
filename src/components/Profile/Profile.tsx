import { handleNavigate } from '../../Routes/navigationService'
import { useStoreUser } from '../../Store/useStoreUsers'
import style from './Profile.module.css'

export const Profile = () => {

    const {setActiveUser} = useStoreUser()

    // Funcion para desloguear
    const handelLogout = () => {
        localStorage.removeItem('token')
        setActiveUser(null)
        handleNavigate('/')
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerProfile}>
                <p>Nombre y Apellido</p>
                <p>Username</p>
                <button onClick={handelLogout}>Cerrar Sesión</button>
            </div>

            <div className={style.containerData}>

                <div className={style.data}>
                    <div className={style.title}>
                        <h1>Tus Datos</h1>
                        <button>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                    <div className={style.info}>
                        <p>Teléfono: 2616928706</p>
                        <p>Fecha Nacimiento: 9/12/18</p>
                    </div>
                </div>

                <div className={style.data}>
                    <div className={style.title}>
                        <h1>Dirección</h1>
                        <button>
                            <span className="material-symbols-outlined">
                                    edit
                            </span>
                        </button>
                    </div>
                    <div className={style.info}>
                        <p>No hay direcciones cargadas</p>
                    </div>
                </div>

                <div className={style.data}>
                    <div className={style.title}>
                        <h1>Datos de acceso</h1>
                        <button>    
                            <span className="material-symbols-outlined">
                                    edit
                            </span>
                        </button>
                    </div>
                    <div className={style.info}>
                        <p>Email: user@gmail.com</p>
                        <p>Contraseña: *******</p>
                    </div>
                </div>

                <div className={style.data}>
                    <div className={style.title}>
                        <h1>Historial de pedidos</h1>
                        <button>
                            <span className="material-symbols-outlined">
                                    edit
                            </span>
                        </button>
                    </div>
                    <div className={style.info}>
                        <p>No has realizado ningun pedido</p>
                    </div>
                </div>


            </div>
        </div>
    )
}