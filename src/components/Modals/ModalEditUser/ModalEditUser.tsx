import React, { useState, type FC } from 'react'
import style from './ModalEditUser.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreUser } from '../../../Store/useStoreUsers'
import type { IRequestUser} from '../../../types/IUser'
import { updatedUser, updatePassword } from '../../../cruds/crudUsers'
import { SubModalAddress } from '../SubModalAddress/SubModalAddress'
import { SuccesAlerts } from '../../../utils/SuccesAlert'

import { ErrorAlert } from '../../../utils/ErrorAlert'
import { handleNavigate } from '../../../Routes/navigationService'



interface IModalEditUser {
    option : string
}

export const ModalEditUser : FC<IModalEditUser> = ({option}) => {
    
    const {closeViewModalEditUser, openViewSubModalAddress, viewSubModalAddress} = useStoreModal()
    
    const {loginUser, fetchLoginUser, setLoginUSer} = useStoreUser()
    
    // Estadp para el cambio de inputs del usuario
    const [user, setUser] = useState<IRequestUser>({ 
        id : loginUser?.id,
        name : loginUser?.name || '',
        username : loginUser?.username || '',
        lastname : loginUser?.lastname || '',
        email : loginUser?.email || '',
        password : loginUser?.password || '',
        phone : loginUser?.phone || 0,
        address : {
            id : loginUser?.address?.id || null
        },
        rol : loginUser?.rol || null
        
    })

    // Estado para mostrar la contrasenia
    const [showPassword, setShowPassword] = useState({
        oldPassword : false,
        newPassword : false,
        confirmPassword : false
    })

    // Funcion para controlar todos los inputs
    const handleShowPassword = (field : 'oldPassword' | 'newPassword' | 'confirmPassword') => {
        setShowPassword((prev) => ({
            ...prev,
            [field] : !prev[field]
        }))
    }

    // Funcion para desloguear
        const handleLogout = () => {
            localStorage.removeItem('token')
            setLoginUSer(null)
            handleNavigate('/')
        }

    // Estado para el manejo de la nueva contraseña
    const [data, setData] = useState({
        oldPassword : '',
        newPassword : '',
        confirmPassword : ''
    })


    // Maneja cambio de inputs
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => { 
        const {name, value} = e.target

        if (option === 'password'){

            setData((prev) => ({
                ...prev,
                [name] : value
            }))

        }else{

            setUser((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }
        
    }
    
    // Funcion para eliminar la direccion
    const handleDelete = async() => {
        setUser((prev) => ({
            ...prev,
            address : null
            
        }))
        fetchLoginUser(`${user.username}`) // Refresco el estado del user
        await updatedUser(user, user.id!) 
        closeViewModalEditUser()
        SuccesAlerts('Eliminado','Se elimino la direccion')
    }
        

    // Envia cambios al back
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {

            // Si el cambio es de la contrase;a uso un endpoint diferente
            if (option === 'password'){

                // Si la contrasenia no coincide retorna
                if (data.newPassword !== data.confirmPassword){
                    ErrorAlert('Error', 'Las contraseñas no coinciden')
                    closeViewModalEditUser()
                    return
                }
                const {oldPassword, newPassword} = data
                const updatedPassword = await updatePassword(user.id!, {oldPassword, newPassword})

                // Si se concreta correctamente el cambio de contrase;a remuevo el token para que se deba volver a loguear
                if (updatedPassword){
                    SuccesAlerts('Actualizado', 'Se actualizo la contraseña, vuelvete a loguear por favor')
                    handleLogout() // Deslogueo
                    closeViewModalEditUser()
                }
            }else { // Sino usa el endpoint de editar

                await updatedUser(user, user.id!)
                fetchLoginUser(`${user.username}`)
                closeViewModalEditUser()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            {option === 'fiscalData' && <h1>Editar datos fiscales</h1>}
            {option === 'address' && <h1>Editar direccion</h1>}
            {option === 'accessData' && <h1>Editar datos de acceso</h1>}

            <form onSubmit={handleSubmit}>
                
                {/* Datos fiscales */}
                {option === 'fiscalData' && 
                    <div className={style.containerData}>
                        <label htmlFor="">Nombre</label>
                        <input type="text" value={user.name} name="name" id="" onChange={handleChange}/>

                        <label htmlFor="">Apellido</label>
                        <input type="text" value={user.lastname} name="lastname" id="" onChange={handleChange}/>

                        <label htmlFor="">Teléfono</label>
                        <input type="number" value={user.phone} name="phone" id="" onChange={handleChange}/>
                    </div>
                }

                {/* Direcciones */}
                {option === 'address' && 
                    <div className={style.containerData}>
                        <label htmlFor="">Dirección</label>
                        {user?.address?.id ? 
                            <div className={style.existAddress}>
                                
                                <p>{loginUser?.address?.street}</p>
                                <p>{loginUser?.address?.number}</p>
                                <p>({loginUser?.address?.locality.name})</p>
                                <span onClick={handleDelete} className="material-symbols-outlined">
                                    delete
                                </span>
                                
                            </div> 
                            : 
                            <div className={style.address}>
                                <p>No hay direccion agregada</p>
                                <button type='button' onClick={openViewSubModalAddress}>Agregar direccion</button>
                            </div>}
                    </div>
                }

                {/* Datos de  acceso*/}
                {option === 'accessData' && 
                    <div className={style.containerData}>
                        <label htmlFor="">Nombre de usuario</label>
                        <input type="text" value={user.username} name="username" id="" onChange={handleChange}/>

                        <label htmlFor="">Correo</label>
                        <input type="text" value={user.email} name="email" id="" onChange={handleChange}/>

                    </div>

                }

                {option === 'password' && 
                    <div className={style.containerData}>
                        <h1>Editar Contraseña</h1>
                        <label htmlFor="">Anterior contraseña</label>

                        <div className={style.containerPassword}>
                            <input type={showPassword.oldPassword ? 'text' : 'password'} name="oldPassword" value={data.oldPassword} placeholder='Anterior contraseña' onChange={handleChange}/>
                            <span onClick={() => handleShowPassword('oldPassword')}  className="material-symbols-outlined">
                                {showPassword.oldPassword ? 'visibility' : 'visibility_off'}
                            </span>
                                
                        </div>


                        <label htmlFor="">Nueva contraseña</label>
                        <div className={style.containerPassword}>
                            <input type={showPassword.newPassword ? 'text' : 'password'} name="newPassword" id="" value={data.newPassword} placeholder='Nueva contraseña' onChange={handleChange}/>

                            <span onClick={() => handleShowPassword('newPassword')}  className="material-symbols-outlined">
                                {showPassword.newPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </div>

                        <label htmlFor="">Confirmar contraseña</label>
                        <div className={style.containerPassword}>
                            <input type={showPassword.confirmPassword ? 'text' : 'password'} name="confirmPassword" id="" value={data.confirmPassword} placeholder='Confirmar contraseña'onChange={handleChange}/>
                            
                            <span onClick={() => handleShowPassword('confirmPassword')} className="material-symbols-outlined">
                                {showPassword.confirmPassword ? 'visibility' : 'visibility_off'}
                            </span>

                        </div>
                    </div>
                }


                <div className={style.containerButtons}>
                    <button onClick={closeViewModalEditUser}>Cancelar</button>
                    <button >Aceptar</button>
                </div>
            </form>
            {viewSubModalAddress && <div className={style.modalBackdrop}><SubModalAddress setUser={setUser}/></div>}
        </div>
    )
}