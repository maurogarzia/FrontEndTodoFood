import { Route, Routes } from "react-router"
import { Home } from "../Screens/Home/Home"
import { AdminScreen } from "../Screens/AdminScreen/AdminScreen"
import { ScreenProducts } from "../Screens/ScreenProducts/ScreenProducts"
import { ScreenPromotions } from "../Screens/ScreenPromotions/ScreenPromotions"

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/products" element={<ScreenProducts/>}></Route>
            <Route path="/promotions" element={<ScreenPromotions/>}></Route>
            <Route path="/admin" element={<AdminScreen/>}></Route>
            
        </Routes>
    )
}