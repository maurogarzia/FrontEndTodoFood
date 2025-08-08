export const isLogged = () : boolean => {
    const token = localStorage.getItem('token')
    return !!token
}