import type React from 'react'
import style from './SubModalUpdatePassword.module.css'
import { useState, type FC } from 'react'
import type { IUpdatePassword } from '../../../types/auth'
import { updatePasswordByAdmin } from '../../../cruds/crudUsers'
import { SuccesAlerts } from '../../../utils/SuccesAlert'
import { useStoreModal } from '../../../Store/useStoreModal'

export interface ISubModalUpdatePassword{
    userId : number
}

export const SubModalUpdatePassword : FC<ISubModalUpdatePassword> = ({userId}) => {

    const {closeViewSubModalUpdatePassword} = useStoreModal()

    const [newPassword, setNewPassword] = useState<IUpdatePassword>({
        newPassword : ''
    })


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        try {
            setNewPassword((prev) => ({
                ...prev,
                [name] : value
            }))
            
        } catch (error : any) {
            console.log(error.message);
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            await updatePasswordByAdmin(userId,newPassword)
            SuccesAlerts('Editado', 'Se editó la contraseña correctamente')
            closeViewSubModalUpdatePassword()
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>Cambio de contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className={style.containerData}>
                    <label htmlFor="">Ingrese la nueva contraseña</label>
                    <input type="text" name="newPassword" value={newPassword.newPassword} onChange={handleChange} placeholder='Nueva contraseña'/>
                </div>

                <div className={style.containerButtons}>
                    <button type='button' onClick={closeViewSubModalUpdatePassword}>Cancelar</button>
                    <button type='submit'>Aceptar</button>

                </div>
            </form>
        </div>
    )
}