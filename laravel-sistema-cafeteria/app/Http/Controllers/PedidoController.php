<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidoCollection;
use App\Models\Pedido;
use App\Models\PedidoProducto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    // 0 significa Orden,  1 Venta
    $fecha = Carbon::now()->day();
        
        if(Auth::user()->rol_id === 2) {
            return new PedidoCollection(Pedido::with('user')->with('productos')->where('estado', 0)->whereDate('created_at', Carbon::today())->orderBy('id', 'ASC')->get());
        }
        if(Auth::user()->rol_id === 3 ) {
            return new PedidoCollection(Pedido::with('user')->with('productos')->where('estado', 1)->whereDate('created_at', Carbon::today())->orderBy('id', 'ASC')->get());
        }
        if(Auth::user()->rol_id === 1 ) {
            return new PedidoCollection(Pedido::with('user')->with('productos')->whereDate('created_at', Carbon::today())->orderBy('id', 'ASC')->get());
        }
        // if(Auth::user()->rol_id === 3 ) {
        //     return new PedidoCollection(Pedido::with('user')->with('productos')->where('estado', 1)->whereDate('created_at', Carbon::today())->orderBy('id', 'ASC')->get());
        // }


        // VISUALIZAR TANTO LAS VENTAS COMO LAS ORDENES AL ADMINISTRADOR

        

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Almacenar un pedido
        $pedido = new Pedido;
        $pedido->user_id = Auth::user()->id;
        $pedido->total = $request->total;
        $pedido->save();

        // Obtener el ID del Pedido
        $id = $pedido->id;

        // Obtener los productos
        $productos = $request->productos;

        // Formatear un arreglo
        $pedido_producto = [];

        foreach($productos as $producto) {
            $pedido_producto[] = [
                'pedido_id' => $id,
                'producto_id' => $producto['id'],
                'cantidad' => $producto['cantidad'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ];
        }

        // Almacenar en BD
        PedidoProducto::insert($pedido_producto);

        return [
            'message' => 'Pedido realizado correctamente, estara listo en unos minutos'
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        $pedido->estado = 1;
        $pedido->save();
        return [
            'pedido' => $pedido
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
