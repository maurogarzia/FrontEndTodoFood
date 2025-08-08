import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Interface que tendra para componente admin
interface Props {
    children: React.ReactNode;
}

interface DecodedToken {
    role: string;
}

export const AdminRoute = ({ children }: Props) => {
    const token = localStorage.getItem("token"); // Busco el token

    if (!token) {
        return <Navigate to="/unauthorized" replace />; // Si no hay token marco que no puede entrar
    }

    try {
        const decoded = jwtDecode<DecodedToken>(token); // Le pongo la interface al decoded para que typescript sepa que hay un rol

        if (decoded.role !== "admin") {
            return <Navigate to="/unauthorized" replace />; // Si el rol no es admin no puede entrar
        }

        return children; // Sino retorna el componente admin
    } catch (error) {
        console.error("Token inválido:", error);
        return <Navigate to="/unauthorized" replace />;
    }
};
