import { useState } from 'react'
import { handleNavigate } from '../../Routes/navigationService'
import style from './Profile.module.css'

import { useStoreUser } from '../../Store/useStoreUsers'
import { useStoreModal } from '../../Store/useStoreModal'
import { ModalEditUser } from '../Modals/ModalEditUser/ModalEditUser'


export const Profile = () => {

    const {setLoginUSer, loginUser} = useStoreUser()
    const {openViewModalEditUser, viewModalEditUser} = useStoreModal()
    
    

    const [option, setOption] = useState<string>('')
    

    // Funcion para desloguear
    const handleLogout = () => {
        localStorage.removeItem('token')
        setLoginUSer(null)
        handleNavigate('/')
    }

    const handleOpenModalEditUSer = (option : string) => {
        setOption(option)
        openViewModalEditUser()
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
                        <button onClick={() => handleOpenModalEditUSer('fiscalData')}>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                    <div className={style.info}>
                        <p>Nombre: {loginUser?.name || "No hay nombre"}</p>
                        <p>Apellido: {loginUser?.lastname || "No hay apellido"}</p>
                        <p>Teléfono: {loginUser?.phone || "No hay telefonos agregados"}</p>
                    </div>
                </div>

                <div className={style.data}>
                    <div className={style.title}>
                        <h1>Dirección</h1>
                        <button onClick={() => handleOpenModalEditUSer('address')}>
                            <span className="material-symbols-outlined">
                                    edit
                            </span>
                        </button>
                    </div>
                    <div className={style.info}>
                        {loginUser?.address?.id == null ?
                            <div>
                                <p>No hay direcciones cargadas</p>    
                            </div> 
                            : 
                            <div className={style.containerAddress}>
                                <p>{loginUser?.address.street || ''}</p>
                                <p>{loginUser?.address.number || ''}</p>
                                <p>{`${loginUser?.address.locality.name}` || ''}</p>  
                            </div>}
                    </div>
                </div>

                <div className={style.data}>
                    <div className={style.title}>
                        <h1>Datos de acceso</h1>
                        <button onClick={() => handleOpenModalEditUSer('accessData')}>    
                            <span className="material-symbols-outlined">
                                    edit
                            </span>
                        </button>
                    </div>
                    <div className={style.info}>
                        <p>Nombre de Usuario: {loginUser?.username || "No hay nombre de usuario"}</p>
                        <p>Correo: {loginUser?.email}</p>
                        

                        <div className={style.password}>
                            <p>Contraseña</p>
                            <button onClick={() => handleOpenModalEditUSer('password')}>Cambiar contraseña</button> 
                        </div>
                    </div>
                </div>

                


            </div>
            {viewModalEditUser && <div className={style.modalBackdrop}><ModalEditUser option={option}/></div>}
        </div>
    )
}