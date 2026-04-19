import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../componentes/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const usernameRef = createRef();

    const [errores, setErrores] = useState([])
    const { registro } = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        registro(datos, setErrores)
        
    }

    return (
      <>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <h1 className=" text-2xl text-center sm:text-left sm:text-4xl font-bold">Registrar Usuario</h1>
            <p className="mt-2 text-center sm:text-left text-xs sm:text-xl">
              Ingresa los datos solicitados para dar de alta un nuevo usuario
            </p>
            <form className="mt-10"
              onSubmit={handleSubmit}
              noValidate
            >

                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

              <div className="mb-5">
                  <input 
                      type="text" 
                      id="name"
                      placeholder="NOMBRE"
                      className=" hover:bg-gray-200 placeholder:text-gray-400 placeholder:font-bold placeholder:text-xs w-full block p-2 bg-gray-100 text-black font-semibold rounded-md pl-3"
                      name="name"
                      ref={nameRef}
                  />
              </div>

              <div className="mb-5">
                  <input 
                      type="email" 
                      id="email"
                      placeholder="CORREO"
                      className=" hover:bg-gray-200 placeholder:text-gray-400 placeholder:font-bold placeholder:text-xs w-full block p-2 bg-gray-100 text-black font-semibold rounded-md pl-3"
                      name="email"
                      ref={emailRef}
                  />
              </div>

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

              <div className="mb-5">
                  <input 
                      type="password" 
                      id="password_confirmation"
                      placeholder="REPETIR CONTRASEÑA"
                      className=" hover:bg-gray-200 placeholder:text-gray-400 placeholder:font-bold placeholder:text-xs w-full block p-2 bg-gray-100 text-black font-semibold rounded-md pl-3"
                      name="password_confirmation"
                      ref={passwordConfirmationRef}
                  />
              </div>

              <input 
                type="submit" 
                className="p-3 bg-sky-700 w-full cursor-pointer hover:bg-sky-800 text-white text-xl text-center m-0 rounded-md mt-2 uppercase"
                value="Registrar"
              />
            </form>
        </div>

        <nav className="mt-5">
          <Link to="/auth/login">
            ¿Ya tienes cuenta? Inicia Sesion
          </Link>
        </nav>
      </>
    )
}
