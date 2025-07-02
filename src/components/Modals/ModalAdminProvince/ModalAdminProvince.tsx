import { useEffect, useState } from 'react'
import { useStoreCountry } from '../../../Store/useStoreCountry'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreProvince } from '../../../Store/useStoreProvince'
import style from './ModalAdminProvince.module.css'
import type { IRequestProvince } from '../../../types/IProvince'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { createProvince, updatedProvince } from '../../../cruds/crudProvince'
import { SuccesAlerts } from '../../../utils/SuccesAlert'

export const ModalAdminProvince = () => {

    const {activeProvince, fetchProvince} = useStoreProvince()
    const {countries, fetchCountry} = useStoreCountry()
    const {closeViewModalAdminProvince} = useStoreModal()

    const [province, setProvince] = useState<IRequestProvince>({
        id : activeProvince?.id! || null,
        name : activeProvince?.name || '',
        country : {id : activeProvince?.country.id! || null}
    })

    useEffect(() => {
        fetchCountry()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        // Maneja el select
        if(name === "country"){
            setProvince((prev) => ({
                ...prev,
                country : {
                    ...prev.country,
                    id : Number(value)
                }
            }))
        } else {

            setProvince((prev) => ({
                ...prev,
                [name] : String(value) ? String(value) : value
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()

        try {
            if (activeProvince) {
                
                await updatedProvince(province, province.id!)
                SuccesAlerts('Editado', 'Se editó la provincia')
                fetchProvince()
                closeViewModalAdminProvince()

            } else {
                
                await createProvince(province)
                SuccesAlerts('Creado', 'Se creó la provincia')
                fetchProvince()
                closeViewModalAdminProvince()
            }
        } catch (error : any) {
            console.log(error.message);
            ErrorAlert('Error', activeProvince ? 'No se pudo editar la provincia' : 'No se pudo crear la provincia')
        }
    }


    return (
        <div className={style.containerPrincipal}>
            <h1>{activeProvince ? 'Editar Provincia' : 'Crear Provincia'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" value={province.name} name="name" id="" placeholder='Nombre' onChange={handleChange}/>

                    <label htmlFor="">Pais</label>
                    <select name="country" value={province.country.id!} onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id!}>{country.name}</option>
                        ))}
                    </select>
                    
                </div>
                <div className={style.containerButtons}>
                    <button  onClick={closeViewModalAdminProvince}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>

        </div>
    )
}