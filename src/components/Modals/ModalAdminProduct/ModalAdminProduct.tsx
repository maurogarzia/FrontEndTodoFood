import React, { useEffect, useState } from 'react'
import { useStoreCategory } from '../../../Store/useStoreCategory'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreProducts } from '../../../Store/useStoreProducts'
import style from './ModalAdminProduct.module.css'
import type { IRequestProducts } from '../../../types/IProducts'
import { createProduct, updatedProduct } from '../../../cruds/crudProducts'

export const ModalAdminProduct = () => {
    const {activeProduct, fetchProduct} = useStoreProducts()
    const {closeViewModalAdminProduct} = useStoreModal()    
    const {categories, fetchCategory} = useStoreCategory()

    useEffect(() => {
        fetchCategory()
    },[])

    const [product, setProduct] = useState<IRequestProducts>({
        id : activeProduct?.id || null,
        name : activeProduct?.name || '',
        category : {id : activeProduct?.category.id || null}
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = e.target

        if (name === 'category') {
            setProduct((prev) => ({
                ...prev,
                category : {
                    ...prev.category,
                    id : Number(value)
                }
            }))
        } else {
            setProduct((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()

        try {
            if (activeProduct) {
                await updatedProduct(product, product.id!)
                fetchProduct()
                closeViewModalAdminProduct()
            } else {
                await createProduct(product)
                fetchProduct()
                closeViewModalAdminProduct()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeProduct ? 'Editar Producto' : 'Crear Producto'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>

                    <label htmlFor="">Nombre</label>
                    <input type="text" value={product.name} name="name" id="" onChange={handleChange}/>

                    <label htmlFor="">Categoría</label>
                    <select name="category" value={product.category.id!} id="" onChange={handleChange}>
                        <option disabled selected>Sin selección</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id!}>{category.name}</option>
                        ))}
                    </select>

                </div>

                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminProduct}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>
        
        </div>
    )
}