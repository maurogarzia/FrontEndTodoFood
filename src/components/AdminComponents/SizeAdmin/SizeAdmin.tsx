import { useEffect } from 'react'

import style from './SizeAdmin.module.css'
import { useStoreSize } from '../../../Store/useStoreSize'
import type { ISize } from '../../../types/ISize'
import { useStoreModal } from '../../../Store/useStoreModal'
import { deleteSize } from '../../../cruds/crudSize'
import { ModalAdminSize } from '../../Modals/ModalAdminSize/ModalAdminSize'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import { ErrorAlert } from '../../../utils/ErrorAlert'

export const SizeAdmin = () => {
    const { sizes, fetchSize, setActiveSize } = useStoreSize()
    const {openViewModalAdminSize, viewModalAdminSize} = useStoreModal()
    const {products, fetchProduct} = useStoreProducts()

    useEffect(() => {
        fetchSize()
    }, [])

    const handleOpen = (size : ISize | null) => {
        setActiveSize(size)
        openViewModalAdminSize()
    }

    const handleDelete = async(id : number) => {

        fetchProduct() // Renderizo productos
        const existingProductWithSize = products.some((product) => product.category.id === id)
        
        if (existingProductWithSize) {
            ErrorAlert('Error', 'El tamaño está asociado con un producto')
            return
        }

        try {
            await deleteSize(id)
            fetchSize()
        } catch (error : any) {
            console.log(error);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Tamaños</h1>
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
                        {sizes.map(size => (
                            <tr key={size.id}>
                                <td>{size.id ?? ''}</td>
                                <td>{size.name}</td>
                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(size)}>Editar</button>
                                        <button onClick={() => handleDelete(size.id!)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewModalAdminSize && <div className={style.modalBackdrop}><ModalAdminSize/></div>}
        </div>
    )
}
