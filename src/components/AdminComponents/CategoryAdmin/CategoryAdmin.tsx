import { useEffect } from 'react'
import style from './CategoryAdmin.module.css'
import { useStoreCategory } from '../../../Store/useStoreCategory'
import type { ICategory } from '../../../types/ICategory'
import { useStoreModal } from '../../../Store/useStoreModal'
import { deleteCategory } from '../../../cruds/crudCategory'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { ModalAdminCategory } from '../../Modals/ModalAdminCategory/ModalAdminCategory'

export const CategoryAdmin = () => {
    const { categories, fetchCategory, setActiveCategory } = useStoreCategory()
    const {openViewModalAdminCategory, viewModalAdminCategory} = useStoreModal()
    const {products, fetchProduct} = useStoreProducts()
    

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleOpen = (category : ICategory | null) => {
        setActiveCategory(category)
        openViewModalAdminCategory()
    }

    const handleDelete = async (id : number) => {

        fetchProduct() // Renderizo productos
        const existingProductWithCategory = products.some((product) => product.category.id === id)

        if (existingProductWithCategory) {
            ErrorAlert('Error', 'La categoría está asociada con un producto')
            return
        }

        try {
            await deleteCategory(id)
            fetchCategory()
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Categorías</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id ?? ''}</td>
                                <td>{category.name}</td>
                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(category)}>Editar</button>
                                        <button onClick={() => handleDelete(category.id!)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewModalAdminCategory && <div className={style.modalBackdrop}><ModalAdminCategory/></div>}
        </div>
    )
}
