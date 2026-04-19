import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Registro from './views/Registro'
import AdminLayout from './layouts/AdminLayout'
import Ordenes from './views/Ordenes'
import Productos from './views/Productos'
import Ventas from './views/Ventas'
import Ticket from './views/Ticket'
import RegistroProducto from './views/RegistroProducto'
import ActualizarProducto from './views/ActualizarProducto'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin/ordenes',
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            },
            {
                path: '/admin/ventas',
                element: <Ventas />
            },
            {
                path: '/admin/productos/register',
                element: <RegistroProducto />
            },
            {
                path: '/admin/productos/update/:id',
                element: <ActualizarProducto />
            }
        ]
    },
    {
        path: '/ticket',
        element: <Ticket />
    }
])

export default router