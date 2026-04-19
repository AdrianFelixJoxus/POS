import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import { useAuth } from '../hooks/useAuth';
import ResumenProducto from "./ResumenProducto";

export default function Resumen() {
  const { pedido, total, handleSubmitNuevaOrden } = useQuiosco();
  const { logout } = useAuth({});

  const comprobarPedido = () => pedido.length === 0;
  const handleSubmit = e => {
      e.preventDefault();
       handleSubmitNuevaOrden(logout);
  }

  

  return (
      <aside className="md:hidden lg:block h-screen overflow-y-scroll p-5 lg:w-72">
        <h1 className="text-4xl font-black">
          Mi pedido
        </h1>
        <p className="text-lg my-5">
            Resumen y totales de tu pedido
        </p>

        <div className="py-10">
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

        <p className="text-xl mt-10">
            Total: {""}
            {formatearDinero(total)}
        </p>

        <form 
            className="w-full"
            onSubmit={handleSubmit}
        >
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
  )
}
