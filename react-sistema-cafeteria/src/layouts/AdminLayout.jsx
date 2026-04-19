import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminSidebar from "../componentes/AdminSidebar";
import { useAuth } from "../hooks/useAuth";


export default function AdminLayout() {

  useAuth({middleware: 'admin' ?? 'barista'})

  


  return (
    <div className='flex flex-col md:flex-row'>
        <AdminSidebar />

        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
          <Outlet />
        </main>

      <ToastContainer />
    </div>
  )
}
