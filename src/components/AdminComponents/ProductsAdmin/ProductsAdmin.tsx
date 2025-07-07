import { useEffect } from 'react'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import style from './ProductsAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import type { IProducts } from '../../../types/IProducts'
import { ModalAdminProduct } from '../../Modals/ModalAdminProduct/ModalAdminProduct'

export const ProductsAdmin = () => {

    const {fetchProduct, products, setActiveProduct} = useStoreProducts()
    const {openViewModalAdminProduct, viewModalAdminProduct} = useStoreModal()

    useEffect(() => {
        fetchProduct()
    },[])

    const handleOpen = (product : IProducts | null) => {
        setActiveProduct(product)
        openViewModalAdminProduct()
    }

    return (
        
            <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Productos</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Detalles</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id ? product.id : '' }</td>
                                <td>{product.name ? product.name : ''}</td>
                                <td>{product.details.map((detail) => (
                                    <div className={style.details}>
                                        <p>{detail.id}</p>
                                    </div>
                                ))}</td>
                                

                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(product)}>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminProduct && <div className={style.modalBackdrop}><ModalAdminProduct/></div>}
        </div>
        
    )
}