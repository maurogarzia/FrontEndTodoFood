import { ModalRegister } from "./components/Modals/ModalRegister/ModalRegister"
import { AppRoutes } from "./Routes/AppRoutes"
import { useStoreModal } from "./Store/useStoreModal"
import style from './App.module.css'

function App() {
  
  const {viewModalRegister} = useStoreModal()

  console.log(viewModalRegister);
  

  return (
    <>
      <AppRoutes/>
      {viewModalRegister && <div className={style.modalBackdrop}><ModalRegister type={false}/></div>}
    </>
  )
}

export default App
