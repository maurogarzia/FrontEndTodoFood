import { useEffect } from 'react'
import { useStoreProvince } from '../../../Store/useStoreProvince'
import style from './ProvinceAdmin.module.css'

export const ProvinceAdmin = () => {

    const {fetchProvince, provinces} = useStoreProvince()

    useEffect(() => {
        fetchProvince()
    },[])

    return(
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
                            <th>País</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {provinces.map((province) => (
                            <tr key={province.id}>
                                <td>{province.id ? province.id : '' }</td>
                                <td>{province.name ? province.name : ''}</td>
                                <td>{province.country.name ? province.country.name : ''}</td>

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