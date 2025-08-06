import { useState, type FC } from 'react'
import style from './ModalRegister.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'

interface IModalRegister {
    type : boolean
}

export const ModalRegister : FC<IModalRegister> = ({type}) => {

    const {closeViewModalRegister} = useStoreModal()
    const [newType, setType] = useState<boolean>(type)
    
    const handleType = () => {
        setType(!newType)
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{newType ? 'Iniciar Sesión' : "Regístrate"}</h1>

            <form action="">
                
                {newType ? 
                
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

                    <div className={style.containerInitSession}>
                        <p>{newType ? 'No tienes cuenta?' : 'Tienes cuenta?'}</p>
                        <p className={style.letter} onClick={handleType}>{newType ? 'Registrarse' : 'Iniciar Sesión'}</p>
                    </div>

                    <hr />

                    <div className={style.containerButtons}>
                        <button type='button' onClick={closeViewModalRegister}>Cancelar</button>
                        <button>Aceptar</button>
                    </div>
            </form>
        </div>
    )
}