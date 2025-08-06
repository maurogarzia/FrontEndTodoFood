export const isLogged = () : boolean => {
    const token = localStorage.getItem('jwtToken')
    return !!token
}