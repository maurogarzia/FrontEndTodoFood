import { useState } from 'react'
import { useStoreModal } from '../../../Store/useStoreModal'
import { useStoreSize } from '../../../Store/useStoreSize'
import style from './ModalAdminSize.module.css'
import type { ISize } from '../../../types/ISize'
import { createSize, updatedSize } from '../../../cruds/crudSize'

export const ModalAdminSize = () => {

    const {activeSize, fetchSize} = useStoreSize()
    const {closeViewModalAdminSize} = useStoreModal()

    const [size, setSize] = useState<ISize>({
        id: activeSize?.id || null,
        name : activeSize?.name || ''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setSize((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activeSize) {
                await updatedSize(size, size.id!)
                fetchSize()
                closeViewModalAdminSize()
            } else {
                await createSize(size)
                fetchSize()
                closeViewModalAdminSize()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
        <h1>{activeSize ? 'Editar Tamaño' : 'Crear Tamaño'}</h1>
            <form action="" onSubmit={handleSubmit}>

                <div className={style.containerData}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" value={size.name} placeholder='Nombre' onChange={handleChange}/>
                </div>

                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminSize}>Cancelar</button>
                    <button>Aceptar</button>

                </div>
            </form>
        </div>
    )
}