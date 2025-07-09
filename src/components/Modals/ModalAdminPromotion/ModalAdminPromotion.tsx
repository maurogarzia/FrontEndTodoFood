import { useEffect, useState } from 'react'
import { useStoreImage } from '../../../Store/useStoreImages'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStorePromotion } from '../../../Store/useStorePromotions'
import style from './ModalAdminPromotion.module.css'
import { SubModalPromotion } from '../SubModalPromotion/SubModalPromotion'
import type { IRequestPromotion } from '../../../types/IPromotion'

export const ModalAdminPromotion = () => {

    const {activePromotion} = useStorePromotion()
    const {closeViewModalAdminPromotion, openSubModalPromotion, subModalPromotion} = useStoreModal()
    const {fetchImage, images} = useStoreImage()

    useEffect(() => {
        fetchImage()
    },[])

    const [option, setOption] = useState<boolean | null>(null) // Estado para abrir el modal de eliminar o adherir producto
    const [promotion, setPromotion] = useState<IRequestPromotion>({
        id : activePromotion?.id || null,
        name : activePromotion?.name || '',
        initDate: activePromotion?.initDate || new Date,
        finallyDate: activePromotion?.finallyDate || new Date,
        description: activePromotion?.description || '',
        discount: activePromotion?.discount || 0,
        price: {id: activePromotion?.price.id || null},
        productsDetails: activePromotion?.products?.map((product) => ({ id: product.id })) || [],
        image: {id: activePromotion?.image.id || null}
        })

    const handleChange = () => {

    }

    const handleOpen = (type : boolean) => {
        setOption(type)
        openSubModalPromotion()
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activePromotion ? 'Editar Promoción' : 'Crear Promoción'}</h1>
            <form action="" className={style.containerForm}>
                
                <div className={style.containerData}>

                    <div className={style.column}>
                        
                        <label htmlFor="">Fecha Inicio</label>
                        <input type="date" name="initDate" id="" />

                        <label htmlFor="">Fecha Fin</label>
                        <input type="date" name="finallyDate" id="" />

                        <label htmlFor="">Descripción</label>
                        <textarea name="description" id=""></textarea>
                    </div>

                    <div className={style.column}>
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="name" id="" />
                        
                        <label htmlFor="">Descuento</label>
                        <input type="number" name="discount" id="" />

                        <label htmlFor="">Imagen</label>
                        <select name="image" id="">
                            <option disabled selected>Sin selección</option>
                            {images.map((image) => (
                                <option key={image.id} value={image.id}>{image.id}</option>
                            ))}
                        </select>
                    </div>


                </div>

                <div className={style.handleButtons}>
                    <button type='button' onClick={() => handleOpen(true)}>Agregar Producto</button>
                    <button type='button' onClick={() => handleOpen(false)}>Eliminar Producto</button>
                </div>

                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminPromotion}>Cancelar</button>
                    <button >Aceptar</button>
                </div>
            </form>
            {subModalPromotion && <div className={style.modalBackdrop}><SubModalPromotion type={option} products={promotion.productsDetails} setProducts={setPromotion}/></div>}
        </div>
    )
}