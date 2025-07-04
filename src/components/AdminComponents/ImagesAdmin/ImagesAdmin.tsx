import { useEffect } from 'react'
import { useStoreImage } from '../../../Store/useStoreImages'
import style from './ImagesAdmin.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'
import { ModalAdminImage } from '../../Modals/ModalAdminImage/ModalAdminImage'
import type { IImage } from '../../../types/IImage'
import { deleteImages } from '../../../cruds/crudImages'
import { useStoreProductDetails } from '../../../Store/useStoreProductDetails'
import { ErrorAlert } from '../../../utils/ErrorAlert'

export const ImagesAdmin = () => {

    const {fetchImage, images, setActiveImage} = useStoreImage()
    const {openViewModalAdminImage, viewModalAdminImage} = useStoreModal()
    const {productDetails, fetchProductDetails} = useStoreProductDetails()

    useEffect(() => {
        fetchImage()
    },[])

    const handleOpen = (image : IImage | null) => {
        setActiveImage(image)
        openViewModalAdminImage()
    }

    const handleDelete = async(id : number) => {

        fetchProductDetails() // Renderizo los detalles
        const existingProductWithImage = productDetails.some((productDetail) => productDetail.image.id === id)

        if (existingProductWithImage) {
            ErrorAlert('Error', 'La imágen se encuentra asociada a un producto')
            return
        }


        try {
            await deleteImages(id)
            fetchImage()
        } catch (error : any) {
            console.log(error.message);
        }
    }

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Imágenes</h1>
                <button onClick={() => handleOpen(null)}>Agregar</button>
            </div>
            <div className={style.entityTable}>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Url</th>
                            <th>PublicId</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {images.map((image) => (
                            <tr key={image.id}>
                                <td>{image.id ? image.id : '' }</td>
                                <td>{image.url ? image.url : ''}</td>
                                <td>{image.publicId ? image.publicId : ''}</td>

                                <td>
                                    <div className={style.actionButtons}>
                                        <button onClick={() => handleOpen(image)}>Editar</button>
                                        <button onClick={() => handleDelete(image.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            {viewModalAdminImage && <div className={style.modalBackdrop}><ModalAdminImage/></div>}
        </div>
    )
}