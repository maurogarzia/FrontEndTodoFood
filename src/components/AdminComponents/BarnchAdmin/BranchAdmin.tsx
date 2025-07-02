import { useEffect } from 'react'
import style from './BranchAdmin.module.css'
import { useStoreBranch } from '../../../Store/UseStoreBranch'

export const BranchAdmin = () => {
    const { branches, fetchBranch } = useStoreBranch()

    useEffect(() => {
        fetchBranch()
    }, [])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Sucursales</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Calle</th>
                            <th>Número</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.map(branch => (
                            <tr key={branch.id}>
                                <td>{branch.id}</td>
                                <td>{branch.address?.street || ''}</td>
                                <td>{branch.address?.number || ''}</td>
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
