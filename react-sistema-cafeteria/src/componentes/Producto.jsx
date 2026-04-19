import { formatearDinero } from "../helpers"
import { Link } from "react-router-dom"
import useQuiosco from "../hooks/useQuiosco"
import { createRef, useState, useEffect } from 'react'
import { useProducto } from "../hooks/useProducto";
import Alerta from '../componentes/Alerta'; 




export default function Producto({producto, botonAgregar = false, botonDisponible = false, botonEditarProducto = false}) {
    const { handleClickModal, handleSetProducto, handleClickProductoAgotado, handleClickProductoDisponible  } = useQuiosco();
    const {handleClickProductoEliminar} = useProducto({middleware: 'auth'})
    const [errores, setErrores] = useState([])
    const {nombre, precio, imagen, disponible, imagen_url, id} = producto

    const comprobarDisponibilidad = () => disponible === 0;


  return (
    <div className="border p-3 shadow bg-white">
    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}    
            
        <img 
            src={`${imagen_url}`}
            alt={`imagen ${nombre}`}
            className="w-full"
        />
        
        
        <div className="p-5">
            <h3 className="text-2xl font-bold">
                {nombre}
            </h3>
            <p className="mt-5 font-black text-4xl text-yellow-800">{formatearDinero(precio)}</p>
        </div>


        {botonEditarProducto && (
            <div className="flex justify-between mx-10">
                
                <Link to={`/admin/productos/update/${id}`}>
                    <img 
                        className="w-8"
                        src="/img/editar-texto.png" 
                        alt="Imagen editar" 
                    />
                </Link>
                <img
                    onClick={ () => {
                        handleClickProductoEliminar(id, setErrores)
                    }}
                    className="w-8 cursor-pointer"
                    src="/img/borrar.png" 
                    alt="Imagen borrar" 
                />
            </div>
        )}
        

        {botonAgregar && (
            <button
                onClick={() => {
                    handleClickModal();
                    handleSetProducto(producto)
                }}
                type="button"
                className="bg-sky-700 hover:bg-sky-900 text-white font-semibold w-full rounded-md mt-5 p-3 uppercase"
            >
                Agregar
            </button>
        )}

        

        {botonDisponible && (
            <button
                onClick={() => handleClickProductoDisponible(producto.id)}
                type="button"
                className={`${comprobarDisponibilidad() ? 'bg-red-700' : 'bg-sky-700'} text-white font-semibold w-full rounded-md mt-5 p-3 uppercase`}
            >
                {comprobarDisponibilidad() ? 'Producto Agotado' : 'Producto Disponible'}
            </button>
        )}

    </div>
  )
}
