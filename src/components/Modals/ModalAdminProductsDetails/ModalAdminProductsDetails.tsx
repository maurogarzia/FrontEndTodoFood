import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStorePrice } from '../../../Store/useStorePrice'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import style from './MOdalAdminProductsDetails.module.css'
import { useStoreSize } from '../../../Store/useStoreSize'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import { useStoreImage } from '../../../Store/useStoreImages'
import type { IRequestProductsDetails } from '../../../types/IProductsDetails'
import { createProductDetails, updatedProductDetails } from '../../../cruds/crudProductDetails'

export const ModalAdminProductsDetails = () => {
    const {activeProductDetails, fetchProductDetails} = useStoreProductDetails()
    const {closeViewModalAdminProductDetails} = useStoreModal()
    const {fetchPrice, prices} = useStorePrice()
    const {fetchSize, sizes} = useStoreSize()
    const {fetchProduct, products} = useStoreProducts()
    const {fetchImage, images} = useStoreImage()

    useEffect(() => {
        fetchPrice()
        fetchSize()
        fetchProduct()
        fetchImage()
    },[])

    const [newDetail, setNewDetail] = useState<IRequestProductsDetails>({
        id : activeProductDetails?.id || null,
        stock : activeProductDetails?.stock || 0,
        price : {
            id : activeProductDetails?.price.id || null
        },
        size : {
            id : activeProductDetails?.size.id || null
        }, 
        image : {
            id : activeProductDetails?.image.id || null
        }, 
        product : {
            id : activeProductDetails?.product.id || null
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = e.target

        if (name === 'price'){
            setNewDetail((prev) => ({
                ...prev,
                price : {
                    ...prev.price,
                    id : Number(value)
                }
            }))
        } else if (name === 'size') {
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
        } else if (name === 'image'){
            setNewDetail((prev) => ({
                ...prev,
                image : {
                    ...prev.image,
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
                    <input type="number" name="stock" id="" onChange={handleChange} />

                    <label htmlFor="">Precio</label>
                    <select name="price" id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {prices.map((price) => (
                            <option key={price.id} value={price.id!} >Compra: {price.purchasePrice}, Venta: {price.salesPrice}</option>
                        ))}
                    </select>

                    <label htmlFor="">Tamaño</label>
                    <select name="size" id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {sizes.map((size) => (
                            <option key={size.id} value={size.id!}>{size.name}</option>
                        ))}
                    </select>

                    <label htmlFor="">Producto</label>
                    <select name="product" id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>

                    <label htmlFor="">Imagen</label>
                    <select name="image" id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {images.map((image) => (
                            <option key={image.id} value={image.id}>{image.id}</option>
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