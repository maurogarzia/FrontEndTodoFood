import axiosInstance from "../components/interceptors/axiosInstance";
import type { ILogin, IRegister } from "../types/auth";
import { BASE_URL } from "../utils/constantes";
import { ErrorAlert } from "../utils/ErrorAlert"

const BASE_REGISTER = `${BASE_URL}/auth/register`
const BASE_LOGIN = `${BASE_URL}/auth/login`

export const register = async(userRegister : IRegister) => {
    try {
        const response = await axiosInstance.post(BASE_REGISTER, userRegister)
        return response.data

    } catch (error : any) {
        ErrorAlert('Error', 'No se pudo registrar el usuario')
        console.log(error.message); 
    }
}

export const login = async(userLogin : ILogin) => {
    try {
        const response = await axiosInstance.post(BASE_LOGIN, userLogin)

        const  token = response.data?.token
        const user = response.data?.user

        if (token) {
            localStorage.setItem("token", token)
        }

        if (user){
            localStorage.setItem("user", JSON.stringify(user))
        }

        console.log(user);
        

        return response.data
    } catch (error : any) {
        ErrorAlert('Error','No se pudo loguear el usuario')
        console.log(error.message);
        
    }
}