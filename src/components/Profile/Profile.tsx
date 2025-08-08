import { useEffect } from 'react'
import { handleNavigate } from '../../Routes/navigationService'
import style from './Profile.module.css'
import { jwtDecode } from 'jwt-decode'
import type { IUser } from '../../types/IUser'
import { useStoreUser } from '../../Store/useStoreUsers'


interface userLogin {
    sub : string | null
}

export const Profile = () => {

    const {setLoginUSer, loginUser} = useStoreUser()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        const decode = jwtDecode<userLogin>(token ? token : '')
        setLoginUSer(decode.sub)

    },[])

    
    

    // Funcion para desloguear
    const handleLogout = () => {
        localStorage.removeItem('token')
        handleNavigate('/')
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerProfile}>
                <p>{loginUser?.name || "Nombre"} {loginUser?.lastname || "Apellido"}</p>
                <p>{loginUser?.username || "Username"}</p>
                <button onClick={handleLogout}>Cerrar Sesión</button>
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