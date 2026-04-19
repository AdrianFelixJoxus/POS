import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto";


export default function Resumen() {
  const { handleClickModalResumen, pedido, total } = useQuiosco();
  const comprobarPedido = () => pedido.length === 0;
  return (
    <div className={`lg:hidden h-screen overflow-y-scroll p-5 lg:w-72`}>
      <div className="flex justify-end">
        <button
            onClick={handleClickModalResumen}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
      </div>
      
      <aside className="md:flex flex-col justify-end gap-10">
        <h1 className="text-4xl font-black">
          Mi pedido
        </h1>
          
        <p className="text-lg my-5">
            Resumen y totales de tu pedido
        </p>

         <div className="py-2 grid grid-cols-3 gap-10">
            {pedido.length === 0 ? (
              <p className="text-center text-2xl">
                No hay elementos en tu pedido aun
              </p>
            ) : (
                pedido.map(producto => (
                    <ResumenProducto 
                        key={producto.id}
                        producto={producto}
                    />
                ))
            )}
          </div>

          <p className="text-xl mt-2">
            Total: {""}
            {formatearDinero(total)}
          </p>

          <form className="w-full">
            <div className="mt-5">
              <input 
                type="submit" 
                className={`${comprobarPedido() ? 'bg-sky-100' : 'bg-sky-700 hover:bg-sky-900'} px-5 py-2 rounded uppercase text-white font-semibold text-center w-full cursor-pointer`}
                value="confirmar pedido"
                disabled={comprobarPedido()}
              />
            </div>
          </form>
        </aside>




    </div>
  )
}