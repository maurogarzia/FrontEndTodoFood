import { useState } from 'react'
import { useStoreImage } from '../../../Store/useStoreImages'
import { useStoreModal } from '../../../Store/useStoreModal'
import style from './ModalAdminImage.module.css'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { createImages, updatedImages } from '../../../cruds/crudImages'

export const ModalAdminImage = () => {

    const {activeImage, images, fetchImage} = useStoreImage()
    const {closeViewModalAdminImage} = useStoreModal()
    const [selectedFile, setSelectedFile] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] // Obtiene el primer archivo
        if (file) {
            setSelectedFile(file)
            const fileReader = new FileReader()
            fileReader.onload = () => {
                setPreview(fileReader.result as string) // Genero vista previa
            }
            fileReader.readAsDataURL(file)
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()

        const existingImage = images.some((image) => image.url === preview)
        if (existingImage) {
            ErrorAlert('Error', 'Ya exista una imágen con esa url')
            return
        }

        try {
            if (activeImage && selectedFile) {
                await updatedImages(selectedFile, activeImage.id!)
                fetchImage()
                closeViewModalAdminImage()
            } else {
                await createImages(selectedFile!)
                fetchImage()
                closeViewModalAdminImage()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeImage ? 'Editar Imágen' : 'Crear Imágen'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerData}>
                    {preview && <img className={style.image} src={preview} alt='Vista previa'/>}
                    {activeImage && (
                        <img className={style.image} src={activeImage.url} alt="Imagen actual" />
                    )}
                    <input type="file" onChange={handleChange}/>
                </div>
                <div className={style.containerButtons}>
                    <button onClick={closeViewModalAdminImage}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>

        </div>
    )
}