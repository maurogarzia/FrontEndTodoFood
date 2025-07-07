import React, { useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreUser } from '../../../Store/useStoreUsers'
import style from './ModalAdminUsers.module.css'
import type { IRequestUser } from '../../../types/IUser'
import { Rol } from '../../../types/enums/Rol'

export const ModalAdminUsers = () => {

    const {activeUser} = useStoreUser()
    const {closeViewModalAdminUser} = useStoreModal()

    const [user, setUser] = useState<IRequestUser>({
        id : activeUser?.id || null,
        name : activeUser?.name || '',
        lastname : activeUser?.lastname || '',
        email : activeUser?.email || '',
        rol : activeUser?.rol || Rol.user,
        dni : activeUser?.dni || 0,
        password : activeUser?.password || '',
        address : {
            id : activeUser?.id || null
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        

        
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeUser ? 'Editar Usuario' : 'Crear Usuario'}</h1>

            <form action="">
                <div className={style.containerData}>

                    <div className={style.column}>
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="name" placeholder='Nombre'/>
                        <label htmlFor="">Apellido</label>
                        <input type="text" name="lastname" placeholder='Apellido' />
                        <label htmlFor="">Dni</label>
                        <input type="number" name="dni" placeholder='Dni' />
                    </div>

                    <div className={style.column}>
                        <label htmlFor="">Contraseña</label>
                        <input type="text" name="password" placeholder='Contraseña' />
                        <label htmlFor="">Rol</label>
                        <input type="text" name="rol" placeholder='Rol' />
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" placeholder='Email' />
                    </div>


                </div>

                <div className={style.buttonAddAddress}>
                    <button>Agregar Dirección</button>
                </div>

                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminUser}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}