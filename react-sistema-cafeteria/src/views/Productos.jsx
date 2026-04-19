import useSWR from "swr"
import clienteAxios from "../config/axios"
import { Link } from "react-router-dom"
import Producto from "../componentes/Producto"
import { useAuth } from "../hooks/useAuth"; 



export default function Productos() {
    //Valida en useauth en hooks si cumple condicion
   useAuth({middleware: 'guest'})


    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/productos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(datos => datos.data)

    const {data, error, isLoading} = useSWR('/api/productos', fetcher, {refreshInterval: 10000})
    

    if(isLoading) return 'Cargando...'

    
    
    

  return (
    <div>
  
        <h1 className='text-4xl font-black'>
          Prodcutos
        </h1>
        <p className='text-2xl my-5'>Maneja la disponibilidad desde aqui</p>

        <Link to={"/admin/productos/register"}
          className=" whitespace-nowrap text-white mb-5 font-semibold w-40 rounded-md mt-5 p-2 uppercase bg-green-500 hover:bg-green-700"
        >
        Nuevo Producto
        </Link>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4'>
            {data?.data?.map( producto => (
                <Producto 
                    key={producto.id}
                    producto={producto}
                    botonDisponible={true}
                    botonEditarProducto={true}
                />
            ))}
        </div>
    </div>
  )
}
