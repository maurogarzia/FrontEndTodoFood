import { useEffect, useState } from 'react'
import { useStoreAddress } from '../../../Store/useStoreAddress'
import { useStoreLocality } from '../../../Store/useStoreLocality'
import { useStoreModal } from '../../../Store/useStoreModal'
import style from './ModalAdminAddress.module.css'
import type { IRequestAddress } from '../../../types/IAddress'
import { createAddress, updatedAddress } from '../../../cruds/crudAddress'

export const ModalAdminAddress = () => {
    const {activeAddress, fetchAddress} = useStoreAddress()
    const {closeViewModalAdminAddress} = useStoreModal()
    const {localities, fetchLocality} = useStoreLocality()

    useEffect(() => {
        fetchLocality()
    },[])

    const [address, setAddress] = useState<IRequestAddress>({
        id : activeAddress?.id || null,
        street : activeAddress?.street || '',
        number : activeAddress?.number || 0,
        locality : {
            id : activeAddress?.locality.id || null
        }
    })


    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = e.target

        if (name === 'locality'){
            setAddress((prev) => ({
                ...prev,
                locality : {
                    ...prev.locality,
                    id : Number(value)
                }
            }))
        } else {
            setAddress((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }

    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activeAddress) {
                await updatedAddress(address, address.id!)
                fetchAddress()
                closeViewModalAdminAddress()
            } else {
                await createAddress(address)
                fetchAddress()
                closeViewModalAdminAddress()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }


    return (
        <div className={style.containerPrincipal}>
            <h1>{activeAddress ? 'Editar Dirección' : 'Crear Dirección'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <label htmlFor="">Calle</label>
                    <input type="text" value={address.street} name="street" id="" placeholder='Calle' onChange={handleChange}/>

                    <label htmlFor="">Número</label>
                    <input type="number" name="number" value={address.number} id=""  placeholder='Número' onChange={handleChange}/>

                    <label htmlFor="">Localidad</label>
                    <select name="locality" value={address.locality.id!} id="" onChange={handleChange}>
                        <option disabled selected>Sin seleccion</option>
                        {localities.map((locality) => (
                            <option key={locality.id} value={locality.id} >{locality.name}</option>
                        ))}
                    </select>
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminAddress}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}