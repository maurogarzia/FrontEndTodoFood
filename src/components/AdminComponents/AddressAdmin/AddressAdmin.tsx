import { useEffect } from 'react'
import { useStoreAddress } from '../../../Store/useStoreAddress'
import style from './AddressAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminAddress } from '../../Modals/ModalAdminAddress/ModalAdminAddress'
import type { IAddress } from '../../../types/IAddress'
import { deleteAddress } from '../../../cruds/crudAddress'

export const AddressAdmin = () => {

    const {fetchAddress, addresses, setActiveAddress} = useStoreAddress()
    const {openViewModalAdminAddress, viewModalAdminAddress} = useStoreModal()

    useEffect(() => {
        fetchAddress()
    },[])

    const handleOpen = (address : IAddress | null) => {
        setActiveAddress(address)
        openViewModalAdminAddress()
    }

    const handleDelete = async(id : number) => {
        try {
            await deleteAddress(id)
            fetchAddress()
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Direcciones</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
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
                                        <button onClick={() => handleOpen(address)}>Editar</button>
                                        <button onClick={() => handleDelete(address.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminAddress && <div className={style.modalBackdrop}><ModalAdminAddress/></div>}
        </div>
    )
}