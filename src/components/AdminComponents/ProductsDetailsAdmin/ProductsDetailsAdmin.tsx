import { useEffect } from 'react'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import style from './ProductsDetailsAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import type { IProductsDetails } from '../../../types/IProductsDetails'
import { deleteProductDetails } from '../../../cruds/crudProductDetails'
import { ModalAdminProductsDetails} from '../../Modals/ModalAdminProductsDetails/ModalAdminProductsDetails'


export const ProductsDetailsAdmin = () => {

    const {productDetails, fetchProductDetails, setActiveProductDetails} = useStoreProductDetails()
    const {viewModalAdminProductDetails, openViewModalAdminProductDetails} = useStoreModal()

    useEffect(() => {
        fetchProductDetails()
    },[])

    const handleOpen = (detail : IProductsDetails | null) => {
        setActiveProductDetails(detail)
        openViewModalAdminProductDetails()
    }

    const handleDelete = async(id : number) => {

        try {
            await deleteProductDetails(id)
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Detalle Productos</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Producto</th>
                            <th>Stock</th>
                            <th>Tamaño</th>
                            <th>Imagen</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productDetails.map((detail) => (
                            <tr key={detail.id}>
                                <td>{detail.id ? detail.id : '' }</td>
                                <td>{detail.product ? detail.product.id : ''}</td>
                                <td>{detail.stock ? detail.stock : ''}</td>
                                <td>{detail.size ? detail.size.name : ''}</td>
                                <td>{detail.image ? detail.image.id : ''}</td>
                                

                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(detail)}>Editar</button>
                                        <button onClick={() => handleDelete(detail.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminProductDetails && <div className={style.modalBackdrop}><ModalAdminProductsDetails/></div>}
        </div>
    )
}