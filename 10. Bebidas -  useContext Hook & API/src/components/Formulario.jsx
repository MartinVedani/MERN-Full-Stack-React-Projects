// Para tener el hook useContext disponible, debemos importarlo como cualquier otro hook.
import React, { useContext, useState } from 'react';

// Una vez disponible, para utilizar el hook useContext, debemos darle el context específico de nuestra proyecto o
// aplicación.  

// Nuestro contexto se genera con la función "createContext()" en el archivo CategoriasContext.jsx

// Para utilizar dicho context entonces demos importar la variable que lo crea, la variable que creamos con el 
// nombre CategoriasContext. 

// Recordemos entonces la estructura completa:  export const CategoriasContext = createContext();

// Importamos entonces la variable para manipular el context específico en este componente. Usamos llaves "{}" porque 
// la variable CategoriasContext no es el export "default" dentro del archivo CategoriasContext.jsx
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

  // Por último, para usar los valores de "value" dentro de <CategoriasProvider></CategoriasProvider> 
  // en CategoriasContext.jsx, debemos extraerlos de CategoriasContext con la ayuda del hook useContext.

  // Utilizamos const { ... } para bajar los valores que necesitamos mediante "destruction" de los "props.children"
  // que nos interesen usar en cada componente.

  // Fijate que gracias a useContext, no es necesario pasarle ningún prop a "const Formulario = () => {...}"

  // *****************************************************************************************************************
  // EJEMPLO
  // extraemos los datos, valores o formulas del context
  // const { hola } = useContext(CategoriasContext);
  // alert(hola); //esperamos leer un alerta que diga "hola desde state"
  // *****************************************************************************************************************

  // extraemos los datos, valores o formulas de los context
  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

  // Obviamente podemos usar un state local, no disponible en el context global. Esto es lo que haremos para tomar
  // lo que los usuarios escriben como input.
  const [busquedaLocal, guardarBusquedaLocal] = useState({
    nombre: '',
    categoria: ''
  })

  // Una vez creado este state local, hacemos DESTRUCTURING sobre busquedaLocal para asignar value={nombre}
  // y value={categoria} a los inputs. Esto nos ayudará a realizar las verificaciones necesarias y para resetear 
  // el formulario.
  const { nombre, categoria } = busquedaLocal;

  //chequear errores
  const [error, guardarError] = useState(false);

  // Función para leer los inputs
  const obtenerDatosReceta = e => {

    // guardamos la busquedaLocal
    guardarBusquedaLocal({
      ...busquedaLocal, //clonamos para no borrar el primero de los dos campos que completo el usuario
      [e.target.name]: e.target.value
    })
  }

  return (
    <form
      className='col-12'
      onSubmit={e => {
        e.preventDefault();
        // validamos la categoria, que es el unico campo obligatorio
        if (categoria.trim() === '') {
          guardarError(true);
          return;
        }
        guardarError(false);
        buscarRecetas(busquedaLocal);
        guardarConsultar(true);
        // resetear form localmente
        guardarBusquedaLocal({
          nombre: '',
          categoria: '',
        });
      }}
    >
      <fieldset className='text-center'>
        <legend>Busca Bebidas por Categoría o Ingrediente</legend>
      </fieldset>

      {(error) ? <p className='alert alert-danger text-center p-2'>La categoría es obligatoria</p> : null}

      <div className='row mt-4'>
        <div className='col-md-4'>
          <input
            className='form-control'
            name='nombre'
            value={nombre}
            type="text"
            placeholder='Ingrediente (opcional)'
            onChange={obtenerDatosReceta}
          />
        </div>

        <div className='col-md-4'>
          <select
            className='form-control'
            name='categoria'
            value={categoria}
            onChange={obtenerDatosReceta}
          >
            <option value="">-- Selecciona Categoría --</option>

            {categorias.map(categoria => (
              <option
                key={categoria.strCategory}
                value={categoria.strCategory}
              >
                {categoria.strCategory}
              </option>
            ))}

          </select>
        </div>

        <div className='col-md-4'>
          <input
            className='btn btn-block btn-primary'
            type="submit"
            value='Buscar Bebidas'
          />
        </div>

      </div>
    </form>
  );
}

export default Formulario;
