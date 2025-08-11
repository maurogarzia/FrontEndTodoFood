import React, { useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreUser } from '../../../Store/useStoreUsers'
import style from './ModalAdminUsers.module.css'
import type { IRequestUser } from '../../../types/IUser'
import { Rol } from '../../../types/enums/Rol'
import { createUsers, updatedUser } from '../../../cruds/crudUsers'

export const ModalAdminUsers = () => {

    const {activeUser, fetchUser} = useStoreUser()
    const {closeViewModalAdminUser} = useStoreModal()

    const [user, setUser] = useState<IRequestUser>({
        id : activeUser?.id || null,
        name : activeUser?.name || '',
        username : activeUser?.username || '',
        lastname : activeUser?.lastname || '',
        email : activeUser?.email || '',
        rol : activeUser?.rol || Rol.user,
        phone : activeUser?.phone || 0,
        password : activeUser?.password || '',
        address : {
            id : activeUser?.id || null
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        
        const {name, value} = e.target

        if (name === 'address') {
            setUser((prev) => ({
                ...prev,
                address : {
                    ...prev.address,
                    id : Number(value)
                }
            }))
        } else {
            setUser((prev) => ({
                ...prev,
                [name] : value
            }))
        }
        
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activeUser) {
                await updatedUser(user, user.id!)
                fetchUser()
                closeViewModalAdminUser()
            } else {
                await createUsers(user)
                fetchUser()
                closeViewModalAdminUser()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeUser ? 'Editar Usuario' : 'Crear Usuario'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <div className={style.column}>
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="name" placeholder='Nombre' onChange={handleChange}/>
                        <label htmlFor="">Apellido</label>
                        <input type="text" name="lastname" placeholder='Apellido' onChange={handleChange}/>
                        <label htmlFor="">Telefono</label>
                        <input type="number" name="phone" placeholder='Telefono' onChange={handleChange}/>
                    </div>

                    <div className={style.column}>
                        <label htmlFor="">Contraseña</label>
                        <input type="text" name="password" placeholder='Contraseña' onChange={handleChange}/>

                        <label htmlFor="">Rol</label>
                        <select name="rol" id="" onChange={handleChange}>
                            <option value={Rol.user}>User</option>
                            <option value={Rol.admin}>Admin</option>
                        </select>
                        
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" placeholder='Email' onChange={handleChange}/>
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