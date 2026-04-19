import { Outlet, redirect } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from '../componentes/Sidebar'
import Resumen from '../componentes/Resumen'
import ModalProducto from '../componentes/ModalProducto'
import ModalResumen from '../componentes/ModalResumen'
import useQuiosco from '../hooks/useQuiosco'
import { useAuth } from '../hooks/useAuth'


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};



Modal.setAppElement('#root')

export default function Layout() {
  useAuth({middleware: 'auth'})
  
  const { modal, modalResumen } = useQuiosco();

 
  return (
    <>
      
        <Modal
          isOpen={modalResumen}
          style={customStyles}
        >
          <ModalResumen />
        </Modal>
      

      <div className='flex flex-col md:flex-row'>
        <Sidebar />

        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
          <Outlet />
        </main>
        
        <Resumen />
      </div>

      
      
      <Modal 
        isOpen={modal}
        style={customStyles}
      >
        <ModalProducto />
      </Modal>

      <ToastContainer />
    
    </>
  )
}
