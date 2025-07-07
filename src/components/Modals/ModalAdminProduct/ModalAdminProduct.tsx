import { useEffect } from 'react'
import { useStoreCategory } from '../../../Store/useStoreCategory'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import style from './ModalAdminProduct.module.css'

export const ModalAdminProduct = () => {
    const {activeProduct} = useStoreProducts()
    const {closeViewModalAdminProduct} = useStoreModal()    
    const {categories, fetchCategory} = useStoreCategory()

    useEffect(() => {
        fetchCategory()
    },[])

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeProduct ? 'Editar Producto' : 'Crear Producto'}</h1>

            <form action="">
                <div className={style.containerData}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" id="" />

                    <label htmlFor="">Categoría</label>
                    <select name="category" id="">

                        {categories.map((category) => (
                            <option key={category.id} value={category.id!}>{category.name}</option>
                        ))}
                    </select>

                </div>

                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminProduct}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        
        </div>
    )
}