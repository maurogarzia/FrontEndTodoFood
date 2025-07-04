import { useStoreUser } from '../../../Store/useStoreUsers'
import style from './ModalAdminUsers.module.css'

export const ModalAdminUsers = () => {

    const {activeUser} = useStoreUser()
 

    return (
        <div className={style.containerPrincipal}>
            <h1>{activeUser ? 'Editar Usuario' : 'Crear Usuario'}</h1>

            <form action="">
                <div className={style.containerData}>

                </div>
                <div className={style.containerButtons}>
                    <button>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}