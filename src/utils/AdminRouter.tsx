import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Props {
    children: React.ReactNode;
}

interface DecodedToken {
    role: string;
}

export const AdminRoute = ({ children }: Props) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/unauthorized" replace />;
    }

    try {
        const decoded = jwtDecode<DecodedToken>(token);

        if (decoded.role !== "admin") {
            return <Navigate to="/unauthorized" replace />;
        }

        return children;
    } catch (error) {
        console.error("Token inválido:", error);
        return <Navigate to="/unauthorized" replace />;
    }
};
