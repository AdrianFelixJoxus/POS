import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom'


export default function Sidebar() {
    const { categorias, handleClickModalResumen } = useQuiosco();
    const {logout, user} = useAuth({middleware: 'auth'})
  return (
    <aside className="md:w-72 row-start-1">
        <div className="p-4 flex justify-center">
            <img 
                src="img/logotazacafe.png" 
                alt="Imagen Logotipo"
                className="w-40"
            />
        </div>

        <p className="my-10 text-xl text-center">Hola: <span className="font-semibold">{user?.name}</span></p>

        <div className="mt-10">
            {categorias.map( categoria => (
                <Categoria 
                    key={categoria.id}
                    categoria={categoria}
                />
            ))}
        </div>

        <nav className=" mt-10 text-center gap-4 p-3 border w-full text-2xl font-semibold truncate hover:text-white hover:bg-yellow-800  cursor-pointer">
            <Link to='/admin' className="flex items-center gap-4">
                <img src="/img/icono_quiosco.png" alt="Imagen Productos" className='w-10'/>
                Administracion
            </Link>
        </nav>

        <div className="my-5 px-5">
            <button
                onClick={logout}
                type="button"
                className="text-center rounded-md text-xl bg-red-500 w-full p-3 font-semibold text-white truncate"
            >
                Cancelar Orden
            </button>
        </div>

        <div className=" hidden md:block my-5 px-5 lg:hidden">
            <button
            onClick={() => {
                handleClickModalResumen();
            }}
                type="button"
                className="text-center rounded-md text-xl bg-sky-700 hover:bg-sky-900 w-full p-3 font-semibold text-white truncate"
            >
                Resumen de Compra
            </button>
        </div>
        
    </aside>
  )
}
