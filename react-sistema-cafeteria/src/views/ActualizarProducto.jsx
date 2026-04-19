import useSWR from "swr"
import clienteAxios from "../config/axios"
import { createRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useNavigate, useParams } from 'react-router-dom'
import Alerta from '../componentes/Alerta';
import useQuiosco from "../hooks/useQuiosco"
import { useProducto } from "../hooks/useProducto"
import { useAuth } from "../hooks/useAuth"; 


export default function RegistroProducto() {

  //Valida en useauth en hooks si cumple condicion
   useAuth({middleware: 'guest'})

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState(null);// Archivo Nuevo
    const [imagenActual, setImagenActual] = useState('')
    const [categoriaId, setCategoriaId] = useState("");

    console.log(imagen)

    // const nombreRef = createRef();
    // const precioRef = createRef();
    //const imagenRef = createRef();
    // const categoriaRef = createRef();

    
    const {id} = useParams()
    
    //console.log(id)
    const token = localStorage.getItem('AUTH_TOKEN')
    
    useEffect( () => {
        const getProducto = async () => {
            const res = await clienteAxios.get(`/api/producto/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setNombre(res.data.nombre)
            setPrecio(res.data.precio)
            setImagenActual(res.data.imagen)
            setCategoriaId(res.data.categoria_id)
        }
        getProducto();
    }, [])
    

  
  const [errores, setErrores] = useState([])
  const {categorias} = useQuiosco();
  const {actualizar} = useProducto({middleware: 'auth'})

  const handleSubmit = async e => {

      e.preventDefault();
      const datos = new FormData();
      // datos.append('nombre', nombreRef.current.value);
      // datos.append('precio', precioRef.current.value);
      // datos.append('imagen', imagenRef.current.files[0]);
      // datos.append('categoria_id', categoriaRef.current.value);
      // datos.append('actualizar', true);
      // datos.append('disponibilidad', false);

      datos.append('_method', 'PUT')
      datos.append('nombre', nombre);
      datos.append('precio', precio);
      if(imagen) { datos.append('imagen', imagen); }
      datos.append('categoria_id', categoriaId);
      datos.append('disponible', 1);
      datos.append('actualizar', true);
      datos.append('disponibilidad', false);

      // const datos = {
      //   nombre: nombreRef.current.value,
      //   precio: precioRef.current.value,
      //   imagen: imagenRef.current.value,
      //   categoria_id: categoriaRef.current.value,
      // }


      // Crear una funcion que realize peticiones al backend
      actualizar(id, datos, setErrores)

  }
  return (
      <>
      

        <div className="bg-white shadow-md rounded-md mt-10 px-10 py-10 lg:px-40 xl:px-56 2xl:px-96">
            <Link to={"/admin/productos"}
              className='flex gap-2 text-center items-center'
            >
            <img 
              className='w-10'
              src="/img/flecha-izquierda.png" 
              alt="Imagen Atras" 
            />
            Regresar
            </Link>

            <h1 className=" text-2xl text-center sm:text-left sm:text-4xl font-bold mt-5">Actualizar Producto</h1>
            <p className="mt-2 text-center sm:text-left text-xs sm:text-xl">
              Realiza los cambios necesarios a continuacion
            </p>
            <form className="mt-10"
              onSubmit={handleSubmit}
              noValidate
            >

                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

              <div className="mb-5">
                  <input 
                      type="text" 
                      id="nombre"
                      placeholder="NOMBRE PRODUCTO"
                      className=" hover:bg-gray-200 placeholder:text-gray-400 placeholder:font-bold placeholder:text-xs w-full block p-2 bg-gray-100 text-black font-semibold rounded-md pl-3"
                      name="nombre"
                      //ref={nombreRef}
                      value={nombre}
                      onChange={ (e) => setNombre(e.target.value)}
                      
                  />
              </div>

              <div className="mb-5">
                  <input 
                      type="number" 
                      id="precio"
                      placeholder="PRECIO PRODUCTO"
                      className=" hover:bg-gray-200 placeholder:text-gray-400 placeholder:font-bold placeholder:text-xs w-full block p-2 bg-gray-100 text-black font-semibold rounded-md pl-3"
                      name="precio"
                      //ref={precioRef}
                      value={precio}
                      onChange={ (e) => setPrecio(e.target.value)}
                  />
              </div>

              <div className="mb-5">
                  <label 
                    htmlFor="imagen"
                    className="text-gray-400 placeholder:font-bold placeholder:text-xs w-full block font-semibold rounded-md pl-3 mb-3"
                  >Ingrese icono o imagen del producto:</label>
                  <input 
                    type="file" 
                    name="imagen"
                    id="imagen"
                    // value={imagen.file[0]}
                    onChange={ (e) => setImagen(e.target.files[0] || null)}
                    
                  />
              </div>

              <div className="mb-5">
                  <select 
                    name="categoria_id" 
                    id="categoria_id"
                    className="w-full border rounded text-black uppercase bg-gray-100 hover:bg-gray-200 text-center"
                    //ref={categoriaRef}
                    value={categoriaId}
                    onChange={ (e) => setCategoriaId(e.target.value)}
                  >
                    <option 
                      value=""
                      disabled
                      selected
                    >--SELECCIONAR CATEGORIA--
                    </option>
                    {categorias.map( categoria => (
                      <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                    ))}
                  </select>
              </div>

             

              <input 
                type="submit" 
                className="p-3 bg-sky-700 w-full cursor-pointer hover:bg-sky-800 text-white text-xl text-center m-0 rounded-md mt-2 uppercase"
                value="Guardar Cambios"
              />
            </form>
        </div>

        {/* <nav className="mt-5">
          <Link to="/auth/login">
            ¿Ya tienes cuenta? Inicia Sesion
          </Link>
        </nav> */}
      </>
    )
}