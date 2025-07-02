import { useEffect } from 'react'
import { useStoreUser } from '../../../Store/useStoreUsers'
import style from './UserAdmin.module.css'

export const UserAdmin = () => {

    const {users, fetchUser} = useStoreUser()

    useEffect(() => {
        fetchUser()
    },[])

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Usuarios</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
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
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        </div>
    )
    
}