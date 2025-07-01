import { useEffect } from 'react'
import { useStoreCountry } from '../../../Store/useStoreCountry'
import style from './CountryAdmin.module.css'

export const CountryAdmin = () => {

    const {fetchCountry,countries} = useStoreCountry()

    useEffect(() => {
        fetchCountry()
    },[])
    

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Paises</h1>
                <button>Agregar</button>
            </div>
            <div className={style.countryTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {countries.map((country) => (
                            <tr key={country.id}>
                                <td>{country.id}</td>
                                <td>{country.name}</td>

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