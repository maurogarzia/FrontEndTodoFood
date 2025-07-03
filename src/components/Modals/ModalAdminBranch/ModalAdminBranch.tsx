import React, { useEffect, useState } from 'react'
import { useStoreAddress } from '../../../Store/useStoreAddress'
import { useStoreBranch } from '../../../Store/UseStoreBranch'
import style from './ModalAdminBranch.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { createBranches, updatedBranch } from '../../../cruds/crudBranches'
import type { IRequestBranch } from '../../../types/IBranch'

export const ModalAdminBranch = () => {

    const {activeBranches, fetchBranch} = useStoreBranch()
    const {fetchAddress, addresses} = useStoreAddress()
    const {closeViewModalAdminBranch} = useStoreModal()

    useEffect(() => {
        fetchAddress()
    },[])

    const [branch, setBranch] = useState<IRequestBranch>({
        id : activeBranches?.id || null,
        name : activeBranches?.name || '',
        address : {
            id : activeBranches?.address.id || null
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === 'address') {
            setBranch((prev) => ({
                ...prev,
                address : {
                    ...prev.address,
                    id : Number(value)
                }
            }))
        } else {
            setBranch((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        console.log(branch);
        

        try {
            if (activeBranches) {
                await updatedBranch(branch, branch.id!)
                fetchBranch()
                closeViewModalAdminBranch()
            } else {
                await createBranches(branch)
                fetchBranch()
                closeViewModalAdminBranch()
            }
        } catch (error : any) {
            console.log(error.mesagge);
            
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <h1>{activeBranches ? 'Editar Sucursal' : 'Crear Sucursal'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" value={branch.name} placeholder='Nombre' onChange={handleChange}/>

                    <label htmlFor="">Dirección</label>
                    <select name="address" value={branch.address.id!} id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {addresses.map((address) => (                            
                            <option key={address.id} value={address.id}>{address.street} {address.number} ({address.locality.name})</option>
                        ))}
                    </select>
                </div>

                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminBranch}>Cancelar</button>
                    <button type='submit'>Aceptar</button>

                </div>
            </form>

        </div>
    )
}