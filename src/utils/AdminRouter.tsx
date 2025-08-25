import { Navigate } from "react-router-dom";
import { Rol } from "../types/enums/Rol";
import { useStoreUser } from "../Store/useStoreUsers";

// Interface que tendra para componente admin
interface Props {
    children: React.ReactNode;
}

export const AdminRoute = ({ children }: Props) => {
    const {loginUser} = useStoreUser()
    const token = localStorage.getItem("token"); // Busco el token

    if (!token || loginUser === null) {
        return <Navigate to="/unauthorized" replace />; // Si no hay token marco que no puede entrar
    }

    try {
        

        if (loginUser.role !== Rol.admin ) {
            return <Navigate to="/unauthorized" replace />; // Si el rol no es admin no puede entrar
        }

        return children; // Sino retorna el componente admin
    } catch (error) {
        console.error("Token inválido:", error);
        return <Navigate to="/unauthorized" replace />;
    }
};
