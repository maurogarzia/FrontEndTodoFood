import { useEffect } from 'react'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import style from './ProductsAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import type { IProducts } from '../../../types/IProducts'
import { ModalAdminProduct } from '../../Modals/ModalAdminProduct/ModalAdminProduct'
import { deleteProduct } from '../../../cruds/crudProducts'

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

    const handleDelete = async( id : number) => {
        try {
            await deleteProduct(id)
        } catch (error : any) {
            console.log(error.message);
        }
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
                            <td>Imagen</td>
                            <th>Descripción</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id ? product.id : '' }</td>
                                <td>{product.name ? product.name : ''}</td>
                                <td>{product.category ? product.category.name : ''}</td>
                                <td>{product.image ? product.image.id : ''}</td>
                                <td>{product.description ? product.description : 'Sin descripción'}</td>
                                
                                
                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(product)}>Editar</button>
                                        <button onClick={() => handleDelete(product.id)}>Eliminar</button>
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