import React, { useEffect, useState } from 'react'
import { useStoreImage } from '../../../Store/useStoreImages'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStorePromotion } from '../../../Store/useStorePromotions'
import style from './ModalAdminPromotion.module.css'
import type { IRequestPromotion } from '../../../types/IPromotion'
import { createPromotion, updatedPromotion } from '../../../cruds/crudPromotions'

export const ModalAdminPromotion = () => {

    const {activePromotion, fetchPromotions} = useStorePromotion()
    const {closeViewModalAdminPromotion} = useStoreModal()
    const {fetchImage, images} = useStoreImage()

    useEffect(() => {
        fetchImage()
    },[])

    const [promotion, setPromotion] = useState<IRequestPromotion>({  
        id : activePromotion?.id || null,
        name : activePromotion?.name || '',
        initDate: activePromotion?.initDate || new Date(),
        finallyDate: activePromotion?.finallyDate || new Date(),
        description: activePromotion?.description || '',
        image: {id: activePromotion?.image.id || null}
        })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        if (name === 'image'){
            setPromotion((prev) => ({
                ...prev,
                image : {
                    ...prev.image,
                    id : Number(value)
                }
            }))

        } else if (name === 'initDate' || name === 'finallyDate'){
            setPromotion((prev) => ({
                ...prev,
                [name] : new Date(value) 
            }))
        } else {
            setPromotion((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activePromotion) {
                await updatedPromotion(promotion, promotion.id!)
                fetchPromotions()
                closeViewModalAdminPromotion()
            } else {
                await createPromotion(promotion)
                fetchPromotions()
                closeViewModalAdminPromotion()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activePromotion ? 'Editar Promoción' : 'Crear Promoción'}</h1>
            <form action="" className={style.containerForm} onSubmit={handleSubmit}>
                
                <div className={style.containerData}>

                        <label htmlFor="">Nombre</label>
                        <input type="text" value={promotion.name} name="name" placeholder='Nombre' onChange={handleChange} />

                        <label htmlFor="">Fecha Inicio</label>
                        <input type="date" value={ new Date(promotion.initDate).toISOString().split('T')[0] } name="initDate" onChange={handleChange}/>

                        <label htmlFor="">Fecha Fin</label>
                        <input type="date" value={ new Date(promotion.finallyDate).toISOString().split('T')[0] } name="finallyDate" onChange={handleChange} />
                        
                        <label htmlFor="">Imagen</label>
                        <select name="image" value={promotion.image.id!} onChange={handleChange}>
                            <option disabled selected>Sin selección</option>
                            {images.map((image) => (
                                <option key={image.id} value={image.id}>{image.id}</option>
                            ))}
                        </select>

                        <label htmlFor="">Descripción</label>
                        <textarea name="description" value={promotion.description} placeholder='Descripción' onChange={handleChange}></textarea>
                    </div>

                    
                    

                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminPromotion}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>
        </div>
    )
}