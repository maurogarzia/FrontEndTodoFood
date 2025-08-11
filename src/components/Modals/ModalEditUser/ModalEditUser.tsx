import React, { useState, type FC } from 'react'
import style from './ModalEditUser.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreUser } from '../../../Store/useStoreUsers'
import type { IRequestUser} from '../../../types/IUser'
import { updatedUser } from '../../../cruds/crudUsers'
import { SubModalAddress } from '../SubModalAddress/SubModalAddress'



interface IModalEditUser {
    option : string
}

export const ModalEditUser : FC<IModalEditUser> = ({option}) => {
    
    const {closeViewModalEditUser, openViewSubModalAddress, viewSubModalAddress} = useStoreModal()
    
    const {loginUser} = useStoreUser()
    
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

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => { 
        const {name, value} = e.target
        
        setUser((prev) => ({
            ...prev,
            [name] : Number(value) ? Number(value) : value
        }))

    }
        
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            await updatedUser(user, user.id!)
            
            closeViewModalEditUser()
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
                                <span className="material-symbols-outlined">
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

                        <label htmlFor="">Contraseña</label>
                        <input type="text" value={user.password} name="password" id="" onChange={handleChange}/>
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