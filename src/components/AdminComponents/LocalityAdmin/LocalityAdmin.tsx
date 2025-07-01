import { useEffect } from 'react'
import { useStoreLocality } from '../../../Store/useStoreLocality'
import style from './LocalityAdmin.module.css'

export const LocalityAdmin = () => {

    const {fetchLocality, localities} = useStoreLocality()

    useEffect(() => {
        fetchLocality()
    },[])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Provincias</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Código Postal</th>
                            <th>Provincia</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {localities.map((localities) => (
                            <tr key={localities.id}>
                                <td>{localities.id ? localities.id : '' }</td>
                                <td>{localities.name ? localities.name : ''}</td>
                                <td>{localities.cp ? localities.cp : ''}</td>
                                <td>{localities.province.name ? localities.province.name : ''}</td>

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