import React, { useEffect, useState } from 'react'
import { useStoreLocality } from '../../../Store/useStoreLocality'
import { useStoreProvince } from '../../../Store/useStoreProvince'
import styles from './ModalAdminLocality.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import type { IRequestLocality } from '../../../types/ILocality'
import { createLocality, updatedLocality } from '../../../cruds/crudLocality'

export const ModalAdminLocality = () => {

    const {activeLocality, fetchLocality} = useStoreLocality()
    const {provinces, fetchProvince} = useStoreProvince()
    const {closeViewModalAdminLocality} = useStoreModal()

    useEffect(() => {
        fetchProvince()
    },[])

    const [locality, setLocality] = useState<IRequestLocality>({
        id : activeLocality?.id! || null,
        name : activeLocality?.name || '',
        cp : activeLocality?.cp || 0,
        province : {
            id : activeLocality?.province.id || null
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === 'province'){
            setLocality((prev) => ({
                ...prev,
                province : {
                    ...prev.province,
                    id : Number(value)
                }
            }))
        } else {
            setLocality((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }
    }
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if(activeLocality){
                await updatedLocality(locality, locality.id!)
                fetchLocality()
                closeViewModalAdminLocality()
            } else {
                await createLocality(locality)
                fetchLocality()
                closeViewModalAdminLocality()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <h1>{activeLocality ? 'Editar Localidad' : 'Crear Localidad'}</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerData}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" value={locality.name} name="name" id="" placeholder='Nombre' onChange={handleChange}/>

                    <label htmlFor="">Código Postal</label>
                    <input type="number" value={locality.cp}  name="cp" id="" placeholder='Código Postal' onChange={handleChange}/>

                    <label htmlFor="">Provincia</label>
                    <select name="province" value={locality.province.id!} id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id} >{province.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeViewModalAdminLocality}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>

        </div>
    )
}