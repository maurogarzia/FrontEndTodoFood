import { useEffect } from 'react'
import { useStoreProvince } from '../../../Store/useStoreProvince'
import style from './ProvinceAdmin.module.css'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { deleteProvince } from '../../../cruds/crudProvince'
import { SuccesAlerts } from '../../../utils/SuccesAlert'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminProvince } from '../../Modals/ModalAdminProvince/ModalAdminProvince'
import type { IProvince } from '../../../types/IProvince'

export const ProvinceAdmin = () => {

    const {fetchProvince, provinces, setActiveProvince} = useStoreProvince()
    const {viewModalAdminProvince, openViewModalAdminProvince} = useStoreModal()

    useEffect(() => {
        fetchProvince()
    },[])


    const handleOpen = (province : IProvince | null) => {
        setActiveProvince(province)
        openViewModalAdminProvince()
    }

    // Eliminar Provincia
    const handleDelete = async(id : number) => {
        try {
            await deleteProvince(id)
            fetchProvince()
            SuccesAlerts('Eliminado', 'Se elimino la provincia')
        } catch (error : any) {
            console.log(error.message);
            ErrorAlert('Error', 'Se elimino la provincia correctamente')
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Provincias</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>País</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {provinces.map((province) => (
                            <tr key={province.id}>
                                <td>{province.id ? province.id : '' }</td>
                                <td>{province.name ? province.name : ''}</td>
                                <td>{province.country.name ? province.country.name : ''}</td>

                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(province)}>Editar</button>
                                        <button onClick={() => handleDelete(province.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminProvince && <div className={style.modalBackdrop}><ModalAdminProvince/></div>}
        </div>
    )
}