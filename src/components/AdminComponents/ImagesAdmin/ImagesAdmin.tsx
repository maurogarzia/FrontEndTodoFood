import { useEffect } from 'react'
import { useStoreImage } from '../../../Store/useStoreImages'
import style from './ImagesAdmin.module.css'

export const ImagesAdmin = () => {

    const {fetchImage, images} = useStoreImage()

    useEffect(() => {
        fetchImage()
    },[])

    return(
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Imágenes</h1>
                <button>Agregar</button>
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
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        </div>
    )
}