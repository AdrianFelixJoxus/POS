import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../componentes/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Login() {

    const passwordRef = createRef();
    const usernameRef = createRef();

    const [errores, setErrores] = useState([])
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    });

    const handleSubmit = async e => {
        e.preventDefault();
        const datos = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }
        login(datos, setErrores)
    }

  return (
    <>
      

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
          <h1 className="text-2xl text-center sm:text-left sm:text-4xl font-bold">Iniciar Sesion</h1>
          <p className="mt-2 text-center sm:text-left text-xs sm:text-xl">
            Para realizar un pedido debes iniciar sesión 
          </p>

          <form className="mt-10"
            onSubmit={handleSubmit}
            noValidate
          >

            {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
            <div className="mb-5">
                <input 
                    type="text" 
                    id="username"
                    placeholder="NOMBRE DE USUARIO"
                    className=" hover:bg-gray-200 placeholder:text-gray-400 placeholder:font-bold placeholder:text-xs w-full block p-2 bg-gray-100 text-black font-semibold rounded-md pl-3"
                    name="username"
                    ref={usernameRef}
                />
            </div>

            <div className="mb-5">
                <input 
                    type="password" 
                    id="password"
                    placeholder="CONTRASEÑA"
                    className=" hover:bg-gray-200 placeholder:text-gray-400 placeholder:font-bold placeholder:text-xs w-full block p-2 bg-gray-100 text-black font-semibold rounded-md pl-3"
                    name="password"
                    ref={passwordRef}
                />
            </div>

            <div>
              <input type="checkbox" className="hover:cursor-pointer"/>
              <label className="ml-3">
                Permanecer inicio de sesión 
              </label>

            </div>

            <input 
              type="submit" 
              className=" cursor-pointer p-3 bg-sky-700 hover:bg-sky-900 w-full text-white text-xl text-center m-0 rounded-md mt-10 uppercase"
              value="Iniciar Sesión"
            />
          </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/register">
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}
