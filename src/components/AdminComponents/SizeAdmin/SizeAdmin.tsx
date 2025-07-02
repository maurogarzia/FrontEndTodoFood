import { useEffect } from 'react'

import style from './SizeAdmin.module.css'
import { useStoreSize } from '../../../Store/useStoreSize'

export const SizeAdmin = () => {
    const { sizes, fetchSize } = useStoreSize()

    useEffect(() => {
        fetchSize()
    }, [])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Talles</h1>
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
                        {sizes.map(size => (
                            <tr key={size.id}>
                                <td>{size.id ?? ''}</td>
                                <td>{size.name}</td>
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
