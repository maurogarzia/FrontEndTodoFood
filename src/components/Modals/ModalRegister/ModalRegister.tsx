import React, { useState, type FC } from 'react'
import style from './ModalRegister.module.css'
import { useStoreModal } from '../../../Store/useStoreModal'

import type { ILogin, IRegister } from '../../../types/auth'
import { login, register } from '../../../cruds/crudAuth'
import { SuccesAlerts } from '../../../utils/SuccesAlert'
import { ErrorAlert } from '../../../utils/ErrorAlert'
import { useStoreUser } from '../../../Store/useStoreUsers'

interface IModalRegister {
    type : boolean
}

export const ModalRegister : FC<IModalRegister> = ({type}) => {

    const {closeViewModalRegister} = useStoreModal()
    const {setLoginUSer} = useStoreUser()
    const [newType, setType] = useState<boolean>(type)

    // Estado para login
    const [userLogin, setUserLogin] = useState<ILogin>({ 
        username : '',
        password : ''
    })

    // Estado para registro
    const [userRegister, setuserRegister] = useState<IRegister>({
        name : '',
        lastname: '',
        username: '',
        password: '',
        role: null,
        email: ''
    })

    // Funcion para cambiar entre registro o login
    const handleType = () => {
        setType(!newType)
    }


    // Estado para ver la contrasenia
    const [showPassword, setShowPassword] = useState<boolean>(false)


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
                const logued = await login(userLogin)
                if (!logued){
                    ErrorAlert('Error', 'No se pudo loguear')
                    closeViewModalRegister()
                    return
                }
                SuccesAlerts('Logueado', 'Usuario logueado')
                closeViewModalRegister()
                setLoginUSer(`${userLogin.username}`)
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

            <form  onSubmit={handleSubmit}>
                
                {newType ? 
                
                    <div className={style.containerLogin}>
                        <input type="text" name="username" id="" placeholder='Nombre de Usuario' onChange={handleChange}/>
                        <div className={style.containerPassword}>
                            <input type={showPassword ? 'text' : 'password'} name="password" id="" placeholder='Contraseña' onChange={handleChange}/>
                            <span onClick={() => setShowPassword(!showPassword)} className="material-symbols-outlined">
                                {showPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </div>
                        
                    </div>
                :
                    <div className={style.containerRegister}>
                        <input type="text" name="name" id="" placeholder='Nombre' onChange={handleChange}/>
                        <input type="text" name="lastname" id="" placeholder='Apellido' onChange={handleChange}/>
                        <input type="text" name='username'placeholder='Nombre Usuario' onChange={handleChange}/>
                        <input type="text" name="email" id="" placeholder='Email' onChange={handleChange}/>
                        <div className={style.containerPassword}>
                            <input type={showPassword ? 'text' : 'password'} name="password" id="" placeholder='Contraseña' onChange={handleChange}/>
                            <span onClick={() => setShowPassword(!showPassword)} className="material-symbols-outlined">
                                {showPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </div>

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