import { useEffect } from 'react'
import style from './CategoryAdmin.module.css'
import { useStoreCategory } from '../../../Store/useStoreCategory'

export const CategoryAdmin = () => {
    const { categories, fetchCategory } = useStoreCategory()

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Categorías</h1>
                <button>Agregar</button>
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
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
