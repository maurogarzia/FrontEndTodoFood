import { useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStorePrice } from '../../../Store/useStorePrice'
import style from './ModalAdminPrice.module.css'
import type { IPrice } from '../../../types/IPrice'
import { createPrice, updatedPrice } from '../../../cruds/crudPrice'


export const ModalAdminPrice = () =>{ 

    const {activePrice, fetchPrice} = useStorePrice()
    const {closeViewModalAdminPrice} = useStoreModal()
    const [price, setPrice] = useState<IPrice>({
        id : activePrice?.id || null,
        purchasePrice : activePrice?.purchasePrice! | 0,
        salesPrice : activePrice?.salesPrice! | 0
    })


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setPrice((prev) => ({
            ...prev,
            [name] : Number(value)
        }))
    }


    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()

        try {
            if (activePrice) {
                await updatedPrice(price, price.id!)
                fetchPrice()
                closeViewModalAdminPrice()
            } else {
                await createPrice(price)
                fetchPrice()
                closeViewModalAdminPrice()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }


    return (
        <div className={style.containerPrincipal}>
            <h1>{activePrice ? 'Editar Precio' : 'Crear Precio'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>
                    <label htmlFor="">Precio de compra</label>
                    <input type="number" name='purchasePrice' onChange={handleChange} placeholder='Precio compra'/>

                    <label htmlFor="">Precio de venta</label>
                    <input type="number" name="salesPrice" onChange={handleChange} placeholder='Precio venta'/>
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminPrice}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>

        </div>
    )
}