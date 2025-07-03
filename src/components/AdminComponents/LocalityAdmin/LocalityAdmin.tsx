import { useEffect } from 'react'
import { useStoreLocality } from '../../../Store/useStoreLocality'
import style from './LocalityAdmin.module.css'
import { deleteLocality } from '../../../cruds/crudLocality'
import type { ILocality } from '../../../types/ILocality'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminLocality } from '../../Modals/ModalAdminLocality/ModalAdminLocality'

export const LocalityAdmin = () => {

    const {fetchLocality, localities, setActiveLocality} = useStoreLocality()
    const {openViewModalAdminLocality, viewModalAdminLocality} = useStoreModal()

    useEffect(() => {
        fetchLocality()
    },[])

    const handleOpen = (locality : ILocality | null) => {
        setActiveLocality(locality)
        openViewModalAdminLocality()
    }

    const handleDelete = async(id : number) => {
        try {
            await deleteLocality(id)
            fetchLocality()
        } catch (error : any) {
            console.log('');
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Localidades</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Código Postal</th>
                            <th>Provincia</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {localities.map((locality) => (
                            <tr key={locality.id}>
                                <td>{locality.id ? locality.id : '' }</td>
                                <td>{locality.name ? locality.name : ''}</td>
                                <td>{locality.cp ? locality.cp : ''}</td>
                                <td>{locality.province.name ? locality.province.name : ''}</td>

                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(locality)}>Editar</button>
                                        <button onClick={() => handleDelete(locality.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminLocality && <div className={style.modalBackdrop}><ModalAdminLocality/></div>}
        </div>
    )
}