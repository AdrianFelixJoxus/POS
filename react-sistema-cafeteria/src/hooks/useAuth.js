import { useEffect } from 'react'
import useSWR from "swr"
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios"
export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    const {data:user, error, mutate, isLoading} = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    
    

    
    const login = async (datos, setErrores) => {
        try {
            const {data, isLoading} = await clienteAxios.post('/api/login', datos)
            console.log(data)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()
        } catch (error) {
          setErrores( Object.values(error?.response?.data?.errors) )
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            
          setErrores( Object.values(error.response.data.errors) )
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    

    useEffect( () => {
        if(middleware === 'guest' && url && user && user.rol_id === 2) {
            navigate(url)
        }
        if(middleware === 'auth' && error) {
            navigate('/auth/login')
            // logout()
        }
        if(middleware === 'guest' && user && user.rol_id !== 1 ) {
            navigate('/')
        }
        if(middleware === 'guest' && user && user.rol_id === 4 ) {
            navigate('/')
        }
        if(middleware === 'guest' && user && user.rol_id === 2) {
            navigate('/admin/ordenes')
        }
        if(middleware === 'guest' && user && user.rol_id === 3) {
            navigate('/admin/ventas')
        }
        // if(middleware === 'guest' && user && user.rol_id === 1) {
        //     navigate('/admin')
        // } // Revisar condicion
    }, [user, error])

    
    
    return {
        login,
        registro,
        logout,
        user,
        error
    }
}