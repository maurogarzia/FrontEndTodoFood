import { useEffect } from 'react'
import style from './BranchAdmin.module.css'
import { useStoreBranch } from '../../../Store/UseStoreBranch'
import { useStoreModal } from '../../../Store/useStoreModal'
import type { IBranch } from '../../../types/IBranch'
import { ModalAdminBranch } from '../../Modals/ModalAdminBranch/ModalAdminBRanch'
import { deleteBranch } from '../../../cruds/crudBranches'

export const BranchAdmin = () => {
    const { branches, fetchBranch, setActiveBranches } = useStoreBranch()
    const {openViewModalAdminBarnch, viewModalAdminBranch} = useStoreModal()

    useEffect(() => {
        fetchBranch()
    }, [])

    const handleOpen = (branch : IBranch | null) => {
        setActiveBranches(branch)
        openViewModalAdminBarnch()
    }

    const handleDelete = async(id : number) => {
        try {
            await deleteBranch(id)
            fetchBranch()
        } catch (error : any) {
            console.log(error.message);            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Sucursales</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Calle</th>
                            <th>Número</th>
                            <th>Localidad</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.map(branch => (
                            <tr key={branch.id}>
                                <td>{branch.id}</td>
                                <td>{branch.name}</td>
                                <td>{branch.address?.street || ''}</td>
                                <td>{branch.address?.number || ''}</td>
                                <td>{branch.address?.locality.name || ''}</td>
                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(branch)}>Editar</button>
                                        <button onClick={() => handleDelete(branch.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewModalAdminBranch && <div className={style.ModalBackdrop}><ModalAdminBranch/></div>}
        </div>
    )
}
