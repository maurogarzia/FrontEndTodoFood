import { deletePromotionDetails } from '../../../cruds/crudPromotionDetails'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStorePromotionDetails } from '../../../Store/useStorePromotionDetails'
import type { IPromotionDetails } from '../../../types/IPromotionDetails'
import { ModalAdminPromotionDetails } from '../../Modals/ModalAdminPromotionDetails/ModalAdminPromotionDetails'
import style from './PromotionDetails.module.css'

export const PromotionDetailsAdmin = () => {

    const {promotionsDetails, setActivePromotionDetails} = useStorePromotionDetails()
    const {openViewModalAdminPromotionDetails, viewModalAdminPromotionDetails} = useStoreModal()

    const handleOpen = (promotionDetail : IPromotionDetails | null) =>{
        openViewModalAdminPromotionDetails()
        setActivePromotionDetails(promotionDetail)
    }

    const handleDelete = async(id : number) => {
        try {
            await deletePromotionDetails(id)
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Detalles Promoción</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Promocion</th>
                            <th>Descuento</th>
                            <th>Precio</th>
                            <th>Detalles de Producto</th>
                        </tr>
                    </thead>

                    <tbody>
                        {promotionsDetails.map((details) => (
                            <tr key={details.id}>
                                <td>{details.id ? details.id : '' }</td>
                                <td>{details?.promotion?.name}</td>
                                <td>{details?.discount}</td>
                                <td>{details?.price?.id}</td>
                                <td>{details.details.map(d => d.product.name)}</td>
                            
                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(details)}>Editar</button>
                                        <button onClick={() => handleDelete(details.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminPromotionDetails && <div className={style.modalBackdrop}><ModalAdminPromotionDetails/></div>}
        </div>
    )
}