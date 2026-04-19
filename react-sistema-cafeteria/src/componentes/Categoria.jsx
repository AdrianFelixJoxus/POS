import useQuiosco from "../hooks/useQuiosco"

export default function Categoria({categoria}) {

    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const { id, nombre, icono } = categoria

    const resaltarCategoriaActual = () =>categoriaActual.id === id ? "bg-yellow-800 text-white" : "bg-white"
    
  return (
    <div onClick={() => handleClickCategoria(id)} className={` ${resaltarCategoriaActual()} flex items-center gap-4 p-3 border w-full hover:text-white hover:bg-yellow-800  cursor-pointer`}>


        <img 
            src={`/img/icono_${nombre}.png`}
            alt="Imagen icono" 
            className="w-10"
        />
        <p className=" text-2xl font-semibold truncate">{nombre}</p>
    </div>
  )
}
