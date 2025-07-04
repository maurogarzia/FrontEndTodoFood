import { useStoreImage } from '../../../Store/useStoreImages'
import { useStoreModal } from '../../../Store/useStoreModal'
import style from './ModalAdminImage.module.css'

export const ModalAdminImage = () => {

    const {activeImage} = useStoreImage()
    const {closeViewModalAdminImage} = useStoreModal()

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeImage ? 'Editar Imágen' : 'Crear Imágen'}</h1>

            <form action="">
                <div className={style.containerData}>
                    <label htmlFor="">Elija la imágen</label>
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminImage}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>

        </div>
    )
}