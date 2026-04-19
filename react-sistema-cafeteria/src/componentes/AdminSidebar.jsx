import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminSidebar() {

    const {logout, user} = useAuth({middleware:'auth'})

    const comprobarSeccion = (url) => window.location.pathname === url ? 'bg-yellow-800 text-white' : 'bg-white text-black'
  return (
    <aside className="md:w-72 h-screen">
        <div className="p-4 flex justify-center">
            <img 
                src="/img/logotazacafe.png" 
                alt="imagen logotipo" 
                className="w-40"
            />
        </div>

         <p className="my-10 text-xl text-center">Hola: <span className="font-semibold">{user?.name}</span></p>

        <nav className=''>
            <Link to="/admin/ordenes" className={`${comprobarSeccion('/admin/ordenes')} font-semibold text-2xl flex items-center gap-4 p-3 border w-full hover:text-white hover:bg-yellow-800  cursor-pointer truncate`}>
            <img 
                src="/img/icono_ordenes.png" 
                alt="Imagen Ordenes" 
                className='w-10'
            />Ordenes</Link>
            <Link to="/admin/productos" className={`${comprobarSeccion('/admin/productos')} font-semibold text-2xl flex items-center gap-4 p-3 border w-full hover:text-white hover:bg-yellow-800  cursor-pointer`}>
            <img 
                src="/img/icono_productos.png" 
                alt="Imagen Productos" 
                className='w-10'
            />Productos</Link>
            <Link to="/admin/ventas" className={`${comprobarSeccion('/admin/ventas')} font-semibold text-2xl flex items-center gap-4 p-3 border w-full hover:text-white hover:bg-yellow-800  cursor-pointer`}>
            <img 
                src="/img/icono_ventas.png" 
                alt="Imagen Productos" 
                className='w-10'
            />Ventas</Link>
            <Link to="/" className={`mt-10 font-semibold text-2xl flex items-center gap-4 p-3 border w-full hover:text-white hover:bg-yellow-800  cursor-pointer`}>
            <img 
                src="/img/icono_quiosco.png" 
                alt="Imagen Productos" 
                className='w-10'
            />Quiosco</Link>

        </nav>

        <div className='my-5 px-5'>
            <button
                onClick={logout}
                type="button"
                className="text-center rounded-md text-xl bg-red-500 w-full p-3 font-semibold text-white truncate"
            >
                Cerrar Sesion
            </button>
        </div>
    </aside>
  )
}
