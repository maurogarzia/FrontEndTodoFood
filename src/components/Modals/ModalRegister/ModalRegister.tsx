import React, { useState, type FC } from 'react'
import style from './ModalRegister.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'

import type { ILogin, IRegister } from '../../../types/auth'
import { login, register } from '../../../cruds/crudAuth'
import { SuccesAlerts } from '../../../utils/SuccesAlert'

interface IModalRegister {
    type : boolean
}

export const ModalRegister : FC<IModalRegister> = ({type}) => {

    const {closeViewModalRegister} = useStoreModal()
    const [newType, setType] = useState<boolean>(type)

    const [userLogin, setUserLogin] = useState<ILogin>({ // Estado para loguearse
        userName : '',
        password : ''
    })

    const [userRegister, setuserRegister] = useState<IRegister>({
        name : '',
        lastName: '',
        userName: '',
        password: '',
        role: null,
        email: ''
    })

    // Funcion para cambiar entre registro o login
    const handleType = () => {
        setType(!newType)
    }


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        try {
            if (newType) {
                setUserLogin((prev) => ({
                    ...prev,
                    [name] : value
                }))
            } else{
                setuserRegister((prev) => ({
                    ...prev,
                    [name] : value
                }))
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (newType) {
                await login(userLogin)
                closeViewModalRegister()
                SuccesAlerts('Logueado', 'Sesión iniciada correctamente')
            } else {
                await register(userRegister)
                closeViewModalRegister()
                SuccesAlerts('Registrado', 'Usuario registrado correctamente')
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>{newType ? 'Iniciar Sesión' : "Regístrate"}</h1>

            <form action="" onSubmit={handleSubmit}>
                
                {newType ? 
                
                    <div className={style.containerLogin}>
                        <input type="text" name="userName" id="" placeholder='Nombre de Usuario' onChange={handleChange}/>
                        <input type="text" name="password" id="" placeholder='Contraseña' onChange={handleChange}/>
                        
                    </div>
                :
                    <div className={style.containerRegister}>
                        <input type="text" name="name" id="" placeholder='Nombre' onChange={handleChange}/>
                        <input type="text" name="lastName" id="" placeholder='Apellido' onChange={handleChange}/>
                        <input type="text" name='userName'placeholder='Nombre Usuario' onChange={handleChange}/>
                        <input type="text" name="password" id="" placeholder='Contraseña ' onChange={handleChange}/>
                        <input type="text" name="email" id="" placeholder='Email' onChange={handleChange}/>

                    </div>}

                    <div className={style.containerInitSession}>
                        <p>{newType ? 'No tienes cuenta?' : 'Tienes cuenta?'}</p>
                        <p className={style.letter} onClick={handleType}>{newType ? 'Registrarse' : 'Iniciar Sesión'}</p>
                    </div>

                    <hr />

                    <div className={style.containerButtons}>
                        <button type='button' onClick={closeViewModalRegister}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
            </form>
        </div>
    )
}