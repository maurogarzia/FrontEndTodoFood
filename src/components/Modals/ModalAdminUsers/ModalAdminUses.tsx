import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreUser } from '../../../Store/useStoreUsers'
import style from './ModalAdminUsers.module.css'
import type { IPatchUser } from '../../../types/IUser'
import { Rol } from '../../../types/enums/Rol'
import { register } from '../../../cruds/crudAuth'
import type { IRegister } from '../../../types/auth'
import { SuccesAlerts } from '../../../utils/SuccesAlert'
import { useStoreAddress } from '../../../Store/useStoreAddress'
import { patchUser } from '../../../cruds/crudUsers'
import { SubModalUpdatePassword } from '../SubModalUpdatePassword/SubModalUpdatePassword'

export const ModalAdminUsers = () => {

    const {activeUser, fetchUser} = useStoreUser()
    const {closeViewModalAdminUser, openViewSubModalUpdatePassword, viewSubModalUpdatePassword} = useStoreModal()
    const {fetchAddress, addresses} = useStoreAddress()

    useEffect(() => {
        fetchAddress()
    },[])

    

    const [user, setUser] = useState<IPatchUser>({
        id : activeUser?.id,
        name: activeUser?.name || '',
        username: activeUser?.username || '',
        lastname: activeUser?.lastname || '',
        email: activeUser?.email || '',
        role: activeUser?.role || Rol.user,
        phone: activeUser?.phone != null ? String(activeUser.phone) : '',

        address: {
            id: activeUser?.address?.id || null,  
        },
    })


    const [userRegister, setUserRegister] = useState<IRegister>({
        name: '',
        lastname: '',
        username: '',
        password: '',
        role: Rol.user || Rol.admin,
        email: ''
    })

    useEffect(() => {
        if(activeUser){
            setUser({
                id : activeUser.id,
                name: activeUser.name || '',
                username: activeUser.username || '',
                lastname: activeUser.lastname || '',
                email: activeUser.email || '',
                role: activeUser.role || '',
                phone: activeUser?.phone != null ? String(activeUser.phone) : '',

                address: { id: activeUser.address?.id || null }
            })
        }
    }, [activeUser])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (activeUser) {

            if(name === 'role') {
                setUser(prev => ({
                    ...prev,
                    role: value === 'ADMIN' ? Rol.admin : Rol.user
                }))

            }else if(name === 'address') {
                setUser((prev) => ({
                    ...prev,
                    address : {
                        id: Number(value)
                    }
                }))

            }else{
            
                setUser((prev) => ({
                    ...prev,
                    [name] : value
                }))
            }

        } else {
            setUserRegister((prev) => ({
                ...prev,
                [name] : value
            }))
        }
    }


    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activeUser) {
                console.log(user);
                
                await patchUser(user.id!, user)
                SuccesAlerts('Actualizado', 'Se actualizó el usuario')
                fetchUser()
                closeViewModalAdminUser()
            } else {
                await register(userRegister)
                SuccesAlerts("Registrado", "Se registró el usuario")
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

            <form onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <div className={style.column}>
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="name" value={activeUser ? user.name : userRegister.name} placeholder='Nombre' onChange={handleChange}/>

                        <label htmlFor="">Apellido</label>
                        <input type="text" name='lastname' value={activeUser ? user.lastname : userRegister.lastname} placeholder='Apellido' onChange={handleChange}/>


                        {activeUser && 
                            <div className={style.column}>
                                <label htmlFor="">Agegar Direccion</label>
                                <select name="address" value={user.address?.id || ''} onChange={handleChange}>
                                    <option value="" disabled>Sin selección</option>
                                    {addresses.map(d => (
                                        <option key={d.id} value={d.id}>{d.street} {d.number} ({d.locality.name})</option>
                                    ))}
                                </select>

                                <button type='button' onClick={openViewSubModalUpdatePassword}>Cambiar contraseña</button>
                            </div>
                        }

                    </div>

                    <div className={style.column}>

                        <label htmlFor="">Nombre de usuario</label>
                        <input type="text" name="username" value={activeUser ? user.username : userRegister.username} placeholder='Nombre de usuario' onChange={handleChange}/>

                        <label htmlFor="">Correo</label>
                        <input type="text" name="email" value={activeUser ? user.email : userRegister.email} placeholder='Correo' onChange={handleChange}/>


                        {activeUser && 
                            <div className={style.column}>
                                <label htmlFor="">Rol</label>
                                <select name="role" value={activeUser ? (user.role === Rol.admin ? 'ADMIN' : 'CUSTOMER') : userRegister.role!} onChange={handleChange}>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="CUSTOMER">CUSTOMER</option>
                                </select>

                                <label htmlFor="">Telefono</label>
                                <input type="text" name="phone" value={user.phone} placeholder='Telefono' onChange={handleChange}/>

                                

                            </div>

                            
                        }
                    </div>
                </div>
                
                <div className={style.containerButtons}>
                    <button type='button' onClick={closeViewModalAdminUser}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>
            {viewSubModalUpdatePassword && <div className={style.modalBackdrop}><SubModalUpdatePassword userId={activeUser?.id!}/></div>}
        </div>
    )
}