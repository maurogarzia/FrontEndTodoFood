import { useEffect } from 'react'
import { useStoreBranch } from '../../Store/UseStoreBranch'
import style from './ListBranches.module.css'


export const ListBranches = () => {

    const {branches, fetchBranch} = useStoreBranch()

    useEffect(() => {fetchBranch()},[])    

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitle}>
                <h1>Sucursales</h1>
            </div>

            <div className={style.branches}>
                {branches.map(b => (
                    <div className={style.containerBranch}>
                        <h2>{b.name}</h2>
                        <p>{b.address.street} {b.address.number} ({b.address.locality.name})</p>

                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address.street + ' ' + b.address.number)}`} target="_blank" rel="noopener noreferrer">
                            Ver ubicación
                        </a>

                        <a
                            href={`https://wa.me/${b.number}?text=${encodeURIComponent('Hola, quisiera pedir del menú')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Consultar
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}