import { Route, Routes, useNavigate } from "react-router"
import { Home } from "../Screens/Home/Home"

import { ScreenProducts } from "../Screens/ScreenProducts/ScreenProducts"
import { ScreenPromotions } from "../Screens/ScreenPromotions/ScreenPromotions"
import { ScreenBranches } from "../Screens/ScreenBranches/ScreenBranches"
import { ScreenProfile } from "../Screens/ScreenProfile/ScreenProfile"
import { ScreenAddProducts } from "../Screens/ScreenAddProducts/ScreenAddProducts"
import { ScreenCart } from "../Screens/ScreenCart/ScreenCart"
import { useEffect } from "react"
import { setNavigateFn } from "./navigationService"
import { PrivateRoute } from "../utils/PrivateRoute"
import { AdminRoute } from "../utils/AdminRouter"
import { AdminScreen } from "../Screens/AdminScreen/AdminScreen"
import { Unauthorized } from "../components/Unauthorized/Unauthorized"



    const  InitNavigation = () => {
        const navigate = useNavigate();
        useEffect(() => {
            setNavigateFn(navigate); 
        }, [navigate]);
        return null;
    }
export const AppRoutes = () => {


    return(
        <>
            <InitNavigation />
            <Routes>

                <Route path="/" element={<Home/>}></Route>
                <Route path="/products" element={<ScreenProducts/>}></Route>
                <Route path="/promotions" element={<ScreenPromotions/>}></Route>
                <Route path="/branches" element={<ScreenBranches/>}></Route>
                <Route path="/add-product" element={<ScreenAddProducts/>}></Route>
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Rutas protegidas */}
                <Route path="/profile" element={
                    <PrivateRoute>
                        <ScreenProfile />
                    </PrivateRoute>
                } />
                
                <Route path="/cart" element={
                    <PrivateRoute>
                        <ScreenCart/>
                    </PrivateRoute>
                }/>

                {/* Rutas de admin */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminScreen />
                    </AdminRoute>
                }/>
            </Routes>
        </>
    )   
}