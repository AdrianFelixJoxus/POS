import { useEffect } from 'react'
import { toast } from 'react-toastify';
import useSWR from "swr"
import { redirect, useNavigate, Navigate, useParams } from 'react-router-dom'
import clienteAxios from "../config/axios"
import { useAuth } from "../hooks/useAuth"; 



export const useProducto = ({middleware}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    const {data:user, error, mutate} = useSWR('/api/user', () => 
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


    const registro = async (datos, setErrores) => {
        
        try {
            const {data} = await clienteAxios.post('/api/productos', datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            //localStorage.setItem('AUTH_TOKEN', data.token); setea el token puede servir para logout
            toast.success(data.message)
            console.log(data.message)
            setErrores([])
            await mutate()
            setTimeout(() => {
                navigate('/admin/productos')
            }, 2000);
        } catch (error) {
            setErrores( Object.values(error.response.data.errors) )
            console.log(error)
        }
    }

    const actualizar = async (id, datos, setErrores) => {
        
        try {
            const {data} = await clienteAxios.post(`/api/productos/${id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success(data.message)
            console.log(data)
            setErrores([])
            await mutate()
            setTimeout(() => {
                navigate('/admin/productos')
            }, 2000);
        } catch (error) {
            setErrores( Object.values(error.response?.data?.errors || {}) )
            console.log(error)
        }
    }

    const handleClickProductoEliminar = async (id, setErrores) => {
        //Valida en useauth en hooks si cumple condicion
        useAuth({middleware: 'guest'})
        try {
            const {data} = await clienteAxios.delete(`/api/productos/${id}` , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            console.log(data)
            setErrores([])
            await mutate()
            setTimeout(() => {
                navigate('/admin/productos')
            }, 2000);
        } catch (error) {
            setErrores( Object.values(error.response?.data?.errors || {}) )
            console.log(error)
        }
    }

    useEffect( () => {
        // if(middleware === 'guest' && url && user && user.rol_id === 2) {
        //     navigate(url)
        // }
        if(middleware === 'auth' && error) {
            navigate('/auth/login')
            // logout()
        }
        if(middleware === 'admin' && user && user.rol_id !== 1) {
            navigate('/')
        }
        if(middleware === 'guest' && user && user.rol_id === 1) {
            navigate('/admin')
        }
    }, [user, error])




    return {
       registro,
       actualizar,
       handleClickProductoEliminar,
       user,
       error
    }
}