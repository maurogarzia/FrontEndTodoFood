import { useEffect } from 'react'
import { useStoreUser } from '../../../Store/useStoreUsers'
import style from './UserAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminUsers } from '../../Modals/ModalAdminUsers/ModalAdminUses'
import type { IUser } from '../../../types/IUser'
import { deleteUser } from '../../../cruds/crudUsers'

export const UserAdmin = () => {

    const {users, fetchUser, setActiveUser} = useStoreUser()
    const {openViewModalAdminUser, viewModalAdminUser} = useStoreModal()

    useEffect(() => {
        fetchUser()
    },[])


    const handleOpen = (user : IUser | null) => {
        setActiveUser(user)
        openViewModalAdminUser()
    }

    const handleDelete = async (id : number) => {
        try {
            await deleteUser(id)
            fetchUser()
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Usuarios</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Contraseña</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>DNI</th>
                            <th>Dirección</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id ? user.id : '' }</td>
                                <td>{user.name ? user.name : ''}</td>
                                <td>{user.password ? user.password : ''}</td>
                                <td>{user.email ? user.email : ''}</td>
                                <td>{user.rol ? user.rol : ''}</td>
                                <td>{user.dni ? user.dni : ''}</td>
                                <td>{user.address ? 
                                    <div>
                                        <p>{user.address.street}</p> <p>{user.address.number}</p>
                                    </div> 
                                    : 
                                    ''}
                                </td>


                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(user)}>Editar</button>
                                        <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminUser && <div className={style.modalBackdrop}><ModalAdminUsers/></div>}
        </div>
    )
    
}