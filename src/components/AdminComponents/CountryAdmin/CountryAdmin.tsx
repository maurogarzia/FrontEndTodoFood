import { useEffect } from 'react'
import { useStoreCountry } from '../../../Store/useStoreCountry'
import style from './CountryAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminCountry } from '../../Modals/ModalAdminCountry/ModalAdminCountry'
import type { ICountry } from '../../../types/ICountry'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { deleteCountry } from '../../../cruds/crudCountry'
import { SuccesAlerts } from '../../../utils/SuccesAlert'
import { useStoreProvince } from '../../../Store/useStoreProvince'

export const CountryAdmin = () => {

    const {fetchCountry,countries, setActiveCountry} = useStoreCountry()
    const {openViewModalAdminCountry, viewModalAdminCountry} = useStoreModal()
    const {fetchProvince, provinces} = useStoreProvince()

    useEffect(() => {
        fetchCountry()
    },[])

    const handleOpen = (country : ICountry | null) => {
        setActiveCountry(country)
        openViewModalAdminCountry()
    }

    const handleDelete = async(id : number) => {

        fetchProvince() //Renderizo Provincias

        const existingProvinceInCounty = provinces.some((province) => province.country.id === id)
        if (existingProvinceInCounty) {
            ErrorAlert('Error', 'El país se encuentra vinculado a una provincia')
            return
        }

        try {
            await deleteCountry(id)
            fetchCountry()
            SuccesAlerts('Eliminado', 'Se eliminó el país')
        } catch (error : any) {
            console.log(error.message);
            ErrorAlert('Error', 'No se pudo eliminar el país')
        }
    }
    

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Países</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {countries.map((country) => (
                            <tr key={country.id}>
                                <td>{country.id ? country.id : '' }</td>
                                <td>{country.name ? country.name : ''}</td>

                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(country)}>Editar</button>
                                        <button onClick={() => handleDelete(country.id!)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminCountry && <div className={style.modalBackdrop}><ModalAdminCountry/></div>}
        </div>
    )
}