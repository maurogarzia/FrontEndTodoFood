import { useState } from 'react'
import { useStoreCategory } from '../../../Store/useStoreCategory'
import { useStoreModal } from '../../../Store/useStoreModal'
import style from './ModalAdminCategory.module.css'
import type { ICategory } from '../../../types/ICategory'
import { createCategory, updatedCategory } from '../../../cruds/crudCategory'

export const ModalAdminCategory = () => {

    const {activeCategory, fetchCategory} = useStoreCategory()
    const {closeViewModalAdminCategory} = useStoreModal()

    const [category, setCategory] = useState<ICategory>({
        id : activeCategory?.id || null,
        name : activeCategory?.name || ''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setCategory((prev) => ({
            ...prev,
            [name] : value        
        }))
    }

    const hanndleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activeCategory) {
                await updatedCategory(category, category.id!)
                fetchCategory()
                closeViewModalAdminCategory()
            } else {
                await createCategory(category)
                fetchCategory()
                closeViewModalAdminCategory()
            }
        } catch (error: any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeCategory ? 'Editar Categoría' : 'Crear Categoría'}</h1>

            <form action="" onSubmit={hanndleSubmit}>
                <div className={style.containerData}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" value={category.name} id="" placeholder='Nombre' onChange={handleChange}/>
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminCategory}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>

        </div>
    )
}