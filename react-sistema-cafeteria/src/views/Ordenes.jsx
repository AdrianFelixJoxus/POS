import useSWR from "swr"
import useQuiosco from "../hooks/useQuiosco"
import { createRef, useEffect, useState } from 'react'
import clienteAxios from "../config/axios"
import { formatearDinero } from "../helpers"
import { useAuth } from "../hooks/useAuth"; 

export default function Ordenes() {
    // //Valida en useauth en hooks si cumple condicion
     useAuth({middleware: 'guest'})

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {refreshInterval:1000})
    const { handleClickCompletarPedido } = useQuiosco();
    const [pedidos, setPedidos] = useState([])

    if(isLoading) return 'Cargando...'
    // setPedidos(pedidosDB);

    const pedidosDB = data.data?.data?.filter(pedido => pedido.estado === 0)
    

  return (
    <div>
        <h1 className='text-4xl font-black'>
          Ordenes
        </h1>
        <p className='text-2xl my-5'>Administra las ordenes desde aqui</p>

        <div className="grid gap-5 2xl:grid-cols-3 lg:grid-cols-2">

            {pedidosDB?.map(pedido => (
                <div key={pedido.id} className="p-5 bg-white shadow space-y-2 border-b"> 
                    <p className="text-xl font-semibold text-slate-600">
                      Contenido del Pedido: 
                    </p>
                    {pedido.productos.map(producto => (
                      <div 
                        key={producto.id} 
                        className="border-b border-b-slate-200 last-of-type:border-none py-4"
                      >
                        <p className="text-sm">ID: <span className="font-semibold">{producto.id}</span></p>
                        <p>{producto.nombre}</p>
                        <p>Cantidad: {''} <span className="font-bold">{producto.pivot.cantidad}</span></p>
                      </div>
                    ))}
                    <p className="text-lg font-bold text-slate-600">Vendedor: {''} <span className="text-slate-500 font-normal">{pedido.user.name}</span></p>
                    <p className="text-lg font-bold text-amber-500">Total a Pagar: {''} <span className="font-normal text-yellow-800">{formatearDinero(pedido.total)}</span></p>
                    <button
                        onClick={() => handleClickCompletarPedido(pedido.id)}
                        type="button" 
                        className="bg-sky-700 hover:bg-sky-900 px-5 py-2 rounded uppercase text-white font-semibold text-center w-full cursor-pointer"
                    >Completar</button>
                </div>
                
            ))}
        </div>

    </div>
  )
}
