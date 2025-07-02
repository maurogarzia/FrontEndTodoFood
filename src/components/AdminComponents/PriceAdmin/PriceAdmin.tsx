import { useEffect } from 'react'

import style from './PriceAdmin.module.css'
import { useStorePrice } from '../../../Store/useStorePrice'

export const PriceAdmin = () => {
    const { prices, fetchPrice } = useStorePrice()

    useEffect(() => {
        fetchPrice()
    }, [])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Precios</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Precio Venta</th>
                            <th>Precio Compra</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map(price => (
                            <tr key={price.id}>
                                <td>{price.id ?? ''}</td>
                                <td>${price.salesPrice}</td>
                                <td>${price.purchasePrice}</td>
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
