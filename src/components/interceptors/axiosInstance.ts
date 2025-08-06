import axios from 'axios'
import { BASE_URL } from '../../utils/constantes'
import { useNavigate } from 'react-router'


const navigate = useNavigate()

// Crear insatncia base

const axiosInstance = axios.create({
    baseURL : BASE_URL
})

// Agrega el token automaticamente

axiosInstance.interceptors.request.use(
    (config) => {
        const token =   localStorage.getItem('jwtToken')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Desloguea si hay un error 401

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwtToken')
            navigate('/login')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance