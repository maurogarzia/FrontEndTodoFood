import { useEffect } from 'react'
import { useStoreAddress } from '../../../Store/useStoreAddress'
import style from './AddressAdmin.module.css'

export const AddressAdmin = () => {

    const {fetchAddress, addresses} = useStoreAddress()

    useEffect(() => {
        fetchAddress()
    },[])

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Direcciones</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Calle</th>
                            <th>Número</th>
                            <th>Localidad</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {addresses.map((address) => (
                            <tr key={address.id}>
                                <td>{address.id ? address.id : '' }</td>
                                <td>{address.street ? address.street : ''}</td>
                                <td>{address.number ? address.number : ''}</td>
                                <td>{address.locality.name ? address.locality.name : ''}</td>

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