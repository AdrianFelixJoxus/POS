<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarProductoRequest extends FormRequest
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
            'nombre' => ['sometimes', 'required', 'unique:productos,nombre', 'string'],
            'precio' => ['sometimes', 'required'],
            'imagen' => ['sometimes', 'image', 'mimes:jpg,jpeg'],
            'categoria_id' => ['sometimes', 'required', 'exists:categorias,id']
        ];
    }

    public function messages()
    {
        return [
            'nombre' => 'El nombre es obligatorio',
            'nombre.unique' => 'El nombre del producto no esta disponible',
            'precio' => 'El precio es obligatorio',
            'precio.numeric' => 'Formato no valido',
            'imagen.image' => 'Formato invalido ',
            'imagen.mimes' => 'Solo acepta JPG',
            'categoria_id' => 'La categoria es obligatoria',
            'categoria_id.exists' => 'Categoria Invalida'
        ];
    }
}
