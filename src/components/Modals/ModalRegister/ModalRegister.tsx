import type { FC } from 'react'
import style from './ModalRegister.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'

interface IModalRegister {
    type : boolean
}

export const ModalRegister : FC<IModalRegister> = ({type}) => {

    const {closeViewModalRegister} = useStoreModal()

    return (
        <div className={style.containerPrincipal}>
            <h1>{type ? 'Login' : "Registro"}</h1>

            <form action="">
                
                {type ? 
                
                    <div className={style.containerLogin}>
                        <input type="text" name="username" id="" placeholder='Nombre de Usuario'/>
                        <input type="text" name="password" id="" placeholder='Contraseña'/>
                    </div>
                :
                    <div className={style.containerRegister}>
                        <input type="text" name="name" id="" placeholder='Nombre'/>
                        <input type="text" name="lastName" id="" placeholder='Apellido'/>
                        <input type="text" name='username'placeholder='Nombre Usuario'/>
                        <input type="text" name="password" id="" placeholder='Contraseña '/>
                        <input type="text" name="email" id="" placeholder='Email'/>
                    </div>}

                    <div className={style.containerButtons}>
                        <button>Cancelar</button>
                        <button onClick={closeViewModalRegister}>Aceptar</button>
                    </div>
            </form>
        </div>
    )
}