import type React from 'react'
import style from './SubModalAddress.module.css'
import type { IRequestAddress } from '../../../types/IAddress'
import { useStoreLocality } from '../../../Store/useStoreLocality'
import { useEffect, useState, type FC } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { createAddress } from '../../../cruds/crudAddress'
import type { IRequestUser } from '../../../types/IUser'


interface ISubModalAddress {
    setUser : React.Dispatch<React.SetStateAction<IRequestUser>>
}

export const SubModalAddress : FC<ISubModalAddress> = ({setUser}) => {

    const {fetchLocality, localities} = useStoreLocality()
    const {closeViewSubModalAddress} = useStoreModal()

    useEffect(() => {fetchLocality()},[])

    const [address, setAddress] = useState<IRequestAddress>({ // Estado para crear la direccion
        id : null,
        street :  '',
        number :  0,
        locality : {
            id : null
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === "locality"){
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
                [name] : value
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            const newAddress = await createAddress(address)
            setUser((prev) => ({
                ...prev,
                address : {
                    ...(prev.address || {}), 
                    id : Number(newAddress.id)
                }
            }))
            closeViewSubModalAddress()
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>Crear Dirección</h1>

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
                    <button onClick={closeViewSubModalAddress}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}