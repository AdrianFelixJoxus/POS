<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActualizarProductoRequest;
use App\Http\Requests\ProductoRequest;
use App\Http\Resources\ProductoCollection;
use App\Models\Producto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->rol_id === 1) {
        //return new ProductoCollection(Producto::where('disponible', 1)->orderBy('id', 'DESC')->paginate(10));
            return new ProductoCollection(Producto::all()->map(function ($producto) {
                $producto->imagen_url = $producto->imagen ? asset('storage/' . $producto->imagen) : null;
                return $producto;
            }));
        }
        if(Auth::user()->rol_id === 2 || Auth::user()->rol_id === 3 || Auth::user()->rol_id === 4) {
            return new ProductoCollection(Producto::where('disponible', 1)->orderBy('id', 'DESC')->get()->map(function ($producto) {
                $producto->imagen_url = $producto->imagen ? asset('storage/' . $producto->imagen) : null;
                return $producto;
            }));
        }
        // if(Auth::user()->rol_id === 3) {
        //     return new ProductoCollection(Producto::where('disponible', 1)->orderBy('id', 'DESC')->get()->map(function ($producto) {
        //         $producto->imagen_url = $producto->imagen ? asset('storage/' . $producto->imagen) : null;
        //         return $producto;
        //     }));
        // }
        // if(Auth::user()->rol_id === 4) {
        //     return new ProductoCollection(Producto::where('disponible', 1)->orderBy('id', 'DESC')->get()->map(function ($producto) {
        //         $producto->imagen_url = $producto->imagen ? asset('storage/' . $producto->imagen) : null;
        //         return $producto;
        //     }));
        // }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductoRequest $request)
    {
        // Agregar mas seguridad EN ESTA PARTE


        $data = $request->validated();

        
        // Almacenar imagen
        $path = $request->file('imagen')->store('cafe', 'public');
        

        // Crear el producto
        $producto = Producto::create([
            'nombre' => $data['nombre'],
            'precio' => $data['precio'],
            'imagen' => $path,
            'disponible' => 1,
            'categoria_id' => $data['categoria_id']
        ]);

        

        return [
            'datos' => $producto,
            'message' => 'Producto creado correctamente'
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $producto = Producto::find($id);
        return $producto;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Producto $producto, Request $res, ActualizarProductoRequest $request)
    {

        $urlDisponibilidad = $res->uri(); // URL DE API
        $disponibilidad = $res->disponibilidad; // Ver si se realiza cambios en disponibilidad de productos
        $actualizar = $res->actualizar;

        
        // return [
        //     'producto' => $res->disponibilidad
        // ];
        // Verifica por medio de url si va a realizar solamente un cambio
        // de disponibilidad en el producto true or false
        if($disponibilidad === true) {
            if($producto->disponible === 1) {
            $producto->disponible = 0;

            } else {
            $producto->disponible = 1;
            }
            $producto->save();
            return [
                'producto' => $producto
            ];       
        }


            // Validar si viene una imagen previa para eso tenemos que traer
            // la imagen del sistema al actualizador
        
            $data = $request->validated();
            
            if($request->hasFile('imagen')) {
                $path = $data->file('imagen')->store('cafe', 'public');
                $producto->imagen = $path;
            }
            
            $producto->nombre = $data['nombre'];
            $producto->precio = $data['precio'];
            //$producto->imagen = $producto->imagen;
            $producto->categoria_id = $data['categoria_id'];
            $producto->updated_at = Carbon::now();
            $producto->save();

            return [
                'data' => $producto,
                'message' => 'Producto Actualizado Correctamente'
            ];
       

            // Realizar cambios en todo el producto
            return [
                'respuesta' => $producto
            ];
        
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto, Request $res)
    {
        //Eliminar del back el producto
        $producto->delete();
        
        // Eliminar la imagen 
        //$imagen_path = public_path('cafe/'. $producto->imagen);
        $path = 'storage/' . $producto->imagen;
        if(File::exists($path)) {
            unlink($path);
        }

        return [
            'data' => $producto,
            'message' => 'Producto Eliminado Correctamente'
        ];
    }
}
