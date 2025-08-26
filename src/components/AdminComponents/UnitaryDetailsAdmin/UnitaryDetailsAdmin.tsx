import { useEffect } from 'react'
import { deleteUnitaryDetail } from '../../../cruds/crudUnitaryDetails'
import { useStoreUnitaryDetails } from '../../../Store/useStoreUnitaryDetails'
import type { IUnitaryDetails } from '../../../types/IUnitaryDetails'
import style from './UnitaryDetailsAdmin.module.css'
import { useStorePromotionDetails } from '../../../Store/useStorePromotionDetails'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminUnitaryDetails } from '../../Modals/ModalAdminUnitaryDetails/ModalAdminUnitaryDetails'

export const UnitaryDetailsAdmin = () => {

    const {details, setActiveDEtail, fetchDetails} = useStoreUnitaryDetails()
    const {promotionsDetails, fetchPromotionsDetails} = useStorePromotionDetails()
    const {openModalAdminUnitaryDetails, viewModalAdminUnitaryDetail} = useStoreModal()

    useEffect(() => {
        fetchDetails()
        fetchPromotionsDetails()
    },[])


    const handleOpen = (detail : IUnitaryDetails | null) => {
        setActiveDEtail(detail)
        openModalAdminUnitaryDetails()
    }

    const handleDelete = async(id : number) => {

        const existDetailsInpromotion = promotionsDetails.some(p =>
            p.unitaryDetails.some(d => d.id === id)
        )

        if (existDetailsInpromotion) {
            ErrorAlert("Error", "El detalle se encuentra vinculado con una promoción")
            return
        }

        try {
            await deleteUnitaryDetail(id)
            fetchDetails()
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Detalles Unitarios</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cantidad</th>
                            <th>Producto</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(detail => (
                            <tr key={detail.id}>
                                <td>{detail.id ?? ''}</td>
                                <td>{detail.quantity ?? ''}</td>
                                <td>{detail.productDetails.product.name ?? ''} {detail.productDetails.size.name}</td>

                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(detail)}>Editar</button>
                                        <button onClick={() => handleDelete(detail.id!)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewModalAdminUnitaryDetail && <div className={style.modalBackdrop}><ModalAdminUnitaryDetails/></div>}
        </div>
    )
}