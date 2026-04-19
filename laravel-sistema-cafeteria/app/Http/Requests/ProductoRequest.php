<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        
            return [
                // Validar el registro
                'nombre' => ['required', 'string', 'unique:productos,nombre'],
                'precio' => ['required', 'numeric'],
                'imagen' => ['required', 'image', 'mimes:jpeg,jpg', 'max:5000' ],
                'categoria_id' => ['required', 'exists:categorias,id']

            ];
        
        
        
    }

    public function messages()
    {
        return [
            'nombre' => 'El nombre es obligatorio',
            'nombre.unique' => 'El nombre del producto no esta disponible',
            'precio' => 'El precio es obligatorio',
            'precio.numeric' => 'Formato no valido',
            'imagen.required' => 'La imagen es obligatoria',
            'imagen.image' => 'Formato invalido ',
            'imagen.mimes' => 'Solo acepta JPG',
            'categoria_id' => 'La categoria es obligatoria',
            'categoria_id.exists' => 'Categoria Invalida'
        ];
    }
}
