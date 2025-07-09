import React, { useEffect, type FC } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import style from './SubModalPromotion.module.css'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import type { IRequestPromotion } from '../../../types/IPromotion'




interface ISubModalPromotion {
    type : boolean | null
    promotion : IRequestPromotion
    setPromotion : React.Dispatch<React.SetStateAction<IRequestPromotion>>
}

export const SubModalPromotion : FC<ISubModalPromotion> = ({type, promotion, setPromotion}) => {

    const {closeSubModalPromotion} = useStoreModal()
    const {fetchProductDetails, productDetails} = useStoreProductDetails()

    useEffect(() => {
        fetchProductDetails()
    },[])

    const handleChangeAdd = (e : React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.target.value)

        if (e.target.checked){
            setPromotion((prev) => ({
                ...prev,
                productsDetails : [...prev.productsDetails, {id}]
            }))
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{type ? 'Agregar Producto' : 'Eliminar Producto'}</h1>

            <form action="">
                <div className={style.containerData}>
                    {type ? 
                    // Si hay que adherir
                    (<div className={style.details}>
                        {productDetails.map((detail) => (
                            <div className={style.addDetails}>
                                <label htmlFor="">{detail.product.name} {detail.size.name}</label>
                                <input type="checkbox" name='productDetail' value={detail.id} checked = {promotion.productsDetails.some(p => p.id === detail.id)} onChange={handleChangeAdd}/>
                            </div>
                        ))}
                    </div>)
                    :
                    // Si hay que eliminar
                    (<div className={style.details}>
                        
                        
                    </div>)}
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeSubModalPromotion}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                    
                </div>
            </form>
        </div>
    )
}