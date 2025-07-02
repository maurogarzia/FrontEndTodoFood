import { useEffect } from 'react'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import style from './ProductsDetailsAdmin.module.css'

export const ProductsDetailsAdmin = () => {

    const {productDetails, fetchProductDetails} = useStoreProductDetails()

    useEffect(() => {
        fetchProductDetails()
    },[])

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Detalle Productos</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Stock</th>
                            <th>Tamaño</th>
                            <th>Imagen</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productDetails.map((detail) => (
                            <tr key={detail.id}>
                                <td>{detail.id ? detail.id : '' }</td>
                                <td>{detail.stock ? detail.stock : ''}</td>
                                <td>{detail.size.id ? detail.size.id : ''}</td>
                                <td>{detail.image.id ? detail.image.id : ''}</td>

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