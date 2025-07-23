import { useEffect, useState } from 'react'
import { useStoreBranch } from '../../Store/UseStoreBranch'
import style from './ListBranches.module.css'
import type { IBranch } from '../../types/IBranch'
import type { IAddress } from '../../types/IAddress'

export const ListBranches = () => {

    const {branches, fetchBranch} = useStoreBranch()

    useEffect(() => {fetchBranch()},[])

    const [number, setNumber] = useState<number>(0) // Estado de numero de telefono
    const [defaultMessage, setDefaultMessage] = useState<string>('') // Estado de mensage encriptado
    const [street, setStreet] = useState<string>()
    const [numberLocation, setNumberLocation] = useState<number>()



    // Funcion para generar los datos de ubicacion
    const searchLocation = (b : IBranch) => {
        setStreet(b.address.street)
        setNumberLocation(b.address.number)
    }

    // Funcion para generar datos de contacto de whatsapp
    const handleConsult = (branch : IBranch) => {
        setNumber(branch.number)
        const message = 'Hola, quisiera pedir del menú'
        const encodeMessage = encodeURIComponent(message)
        setDefaultMessage(encodeMessage)
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitle}>
                <h1>Sucursales</h1>
            </div>

            <div className={style.containerFilter}>
                <button>Filtrar</button>
            </div>

            <div className={style.branches}>
                {branches.map(b => (
                    <div className={style.containerBranch}>
                        <h2>{b.name}</h2>
                        <p>{b.address.street} {b.address.number} ({b.address.locality.name})</p>

                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(street + ' ' + numberLocation)}`}>
                            <button onClick={() => searchLocation(b)}>Ver ubicación</button>
                        </a>

                        <a href={`http://wa.me/${number}?text=${defaultMessage}`}>
                            <button onClick={() => handleConsult(b)}>Consultar</button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}