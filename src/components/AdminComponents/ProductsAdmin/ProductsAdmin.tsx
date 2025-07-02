import { useEffect } from 'react'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import style from './ProductsAdmin.module.css'

export const ProductsAdmin = () => {

    const {fetchProduct, products} = useStoreProducts()

    useEffect(() => {
        fetchProduct()
    },[])

    return (
        <div>
            <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Productos</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Detalles</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id ? product.id : '' }</td>
                                <td>{product.name ? product.name : ''}</td>
                                <td>{product.details.id ? product.details.id : ''}</td>
                                

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
        </div>
    )
}