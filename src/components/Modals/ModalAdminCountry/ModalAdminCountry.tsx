import { useState } from 'react'
import { useStoreCountry } from '../../../Store/useStoreCountry'
import { useStoreModal } from '../../../Store/useStoreModal'
import style from './ModalAdminCountry.module.css'
import type { ICountry } from '../../../types/ICountry'
import { createCountry, updatedCountry } from '../../../cruds/crudCountry'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { SuccesAlerts } from '../../../utils/SuccesAlert'

export const ModalAdminCountry = () => {

    const {activeCountry, fetchCountry} = useStoreCountry()
    const {closeViewModalAdminCountry} = useStoreModal()


    const [country, setCountry] = useState<ICountry>({
        id : activeCountry?.id || null,
        name : activeCountry?.name || ''
    })


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setCountry((prev) => ({
            ...prev,
            [name] : value
        }))

    }

    const handleSubmit = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            if (activeCountry) {
                // Editar
                await updatedCountry(country, country.id!)
                SuccesAlerts('Editado', 'Se edito el país correctamente')
                fetchCountry() // Actualizo el estado
                closeViewModalAdminCountry()

            } else {

                await createCountry(country)
                SuccesAlerts('Creado', 'Se creo el país correctamente')
                fetchCountry()
                closeViewModalAdminCountry()
            }
        } catch (error : any) {
            console.log(error.message);
            ErrorAlert('Error', activeCountry ? 'No se pudo editar el país' : 'No se pudo crear el país')
            
        }

    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeCountry ? 'Editar País' : 'Crear País'}</h1>
            <form action="" onSubmit={handleSubmit}>  
                
                <div className={style.containerData}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" value={country.name} placeholder='Nombre' onChange={handleChange}/>

                </div>
                
                    <div className={style.containerButtons}>
                        <button onClick={closeViewModalAdminCountry}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
            </form>
        </div>
    )
}