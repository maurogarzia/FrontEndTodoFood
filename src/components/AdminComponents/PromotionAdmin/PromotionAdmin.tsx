
import { useEffect } from 'react'
import { useStorePromotion } from '../../../Store/useStorePromotions'
import style from './PromotionAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { deletePromotion } from '../../../cruds/crudPromotions'
import { ModalAdminPromotion } from '../../Modals/ModalAdminPromotion/ModalAdminPromotion'
import type { IPromotion } from '../../../types/IPromotion'

export const PromotionAdmin = () => {

    const {fetchPromotions, promotions, setActivePromotion} = useStorePromotion()
    const {viewModalAdminPromotion, openViewModalAdminPromotion} = useStoreModal()


    useEffect(() => {
        fetchPromotions()
    } ,[])

    const handleOpen = (promotion : IPromotion | null) => {
        openViewModalAdminPromotion()
        setActivePromotion(promotion)
    }

    const handleDelete = async(id : number) => {    
        try {
            await deletePromotion(id)
            fetchPromotions()
        } catch (error : any) {
            console.log(error.message);
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Promociones</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Final</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>

                    <tbody>
                        {promotions.map((promotion) => (
                            <tr key={promotion.id}>
                                <td>{promotion.id ? promotion.id : '' }</td>
                                <td>{promotion.name ? promotion.name : ''}</td>
                                <td>{promotion.initDate ? String(promotion.initDate) : ''}</td>
                                <td>{promotion.finallyDate ? String(promotion.finallyDate) : ''}</td>
                                <td>{promotion.description ? promotion.description : ''}</td>
                                <td>{promotion.image?.id}</td>
                            
                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(promotion)}>Editar</button>
                                        <button onClick={() => handleDelete(promotion.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminPromotion && <div className={style.modalBackdrop}><ModalAdminPromotion/></div>}
        </div>
    )
}