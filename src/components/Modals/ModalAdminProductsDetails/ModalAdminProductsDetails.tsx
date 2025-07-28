import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import style from './MOdalAdminProductsDetails.module.css'
import { useStoreSize } from '../../../Store/useStoreSize'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import type { IRequestProductsDetails } from '../../../types/IProductsDetails'
import { createProductDetails, updatedProductDetails } from '../../../cruds/crudProductDetails'

export const ModalAdminProductsDetails = () => {
    const {activeProductDetails, fetchProductDetails} = useStoreProductDetails()
    const {closeViewModalAdminProductDetails} = useStoreModal()
    const {fetchSize, sizes} = useStoreSize()
    const {fetchProduct, products} = useStoreProducts()
    

    useEffect(() => {
        fetchSize()
        fetchProduct()
        
    },[])

    const [newDetail, setNewDetail] = useState<IRequestProductsDetails>({
        id : activeProductDetails?.id || null,
        stock : activeProductDetails?.stock || 0,
        price : activeProductDetails?.price || 0,
        size : {
            id : activeProductDetails?.size.id || null
        },  
        product : {
            id : activeProductDetails?.product.id || null
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = e.target

        
        if (name === 'size') {
            setNewDetail((prev) => ({
                ...prev,
                size : {
                    ...prev.size,
                    id : Number(value)
                }
            }))
        } else if (name === 'product'){
            setNewDetail((prev) => ({
                ...prev,
                product : {
                    ...prev.product,
                    id : Number(value)
                }
            }))
        } else {
            setNewDetail((prev) => ({
                ...prev,
                [name] : Number(value)
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e. preventDefault()
        try {
            if (activeProductDetails) {
                await updatedProductDetails(newDetail, newDetail.id!)
                fetchProductDetails()
                closeViewModalAdminProductDetails()
            } else {
                await createProductDetails(newDetail)
                fetchProductDetails()
                closeViewModalAdminProductDetails()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeProductDetails ? 'Editar Detalle del Producto' : 'Crear Detalle del Producto'}</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>
                    <label htmlFor="">Stock</label>
                    <input type="number" name="stock" value={newDetail.stock} onChange={handleChange} />

                    <label htmlFor="">Precio</label>
                    <input type="number" name="price" value={newDetail.price} onChange={handleChange} placeholder='Precio'/>

                    <label htmlFor="">Tamaño</label>
                    <select name="size" value={newDetail.size.id!} onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {sizes.map((size) => (
                            <option key={size.id} value={size.id!}>{size.name}</option>
                        ))}
                    </select>

                    <label htmlFor="">Producto</label>
                    <select name="product" value={newDetail.product.id!} id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>

                    
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminProductDetails}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}