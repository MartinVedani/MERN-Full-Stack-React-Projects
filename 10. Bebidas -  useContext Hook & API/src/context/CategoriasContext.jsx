import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Al utilizar context API, los datos ahora van a fluir desde context y no desde App.js - diferente a  
// cuando usamos props o cuando utilizamos Redux.

// Crear el Context específico que utilizaremos a lo largo y ancho de nuestra aplicación.
export const CategoriasContext = createContext();

// Siempre que se crea un context se necesita un Provider desde donde van a salir los datos. 
// Entonces creamos al provider que es donde se deben alojar las funciones y state.

// En React los datos, valores y formulas fluyen desde el componente padre "App" hacia todos los componentes hijos, y
// se usan las formulas que se han pasado para que los componentes hijos puedas modificar un state dentro del 
// componente padre App.

// Usando context, al Provider le vamos a pasar "props" para poder luego pasarle los datos directamente a TODOS los 
// props.children directamente utilizando CategoriasProvider en el componente padre App.

const CategoriasProvider = (props) => {

  // *****************************************************************************************************************
  // EJEMPLO
  // Creamos el state del Context
  // const [hola, guardarHola] = useState('Hola desde state');
  // *****************************************************************************************************************

  // Dentro del return se alojan todos los valores, datos y fórmulas que se harán disponibles a TODOS los componentes 
  // hijos y que van a fluir vía la referencia props.children. Para esto, utilizamos CategoriasContext con la misma 
  // sintaxis de cualquier otro componente pero le agregamos ".Provider".

  // En "value" ponemos todo los datos, valores y fórmulas que deban fluir via "props.children". De esta forma, lo que 
  // este en value, quedará automáticamente disponible en TODOS los demás componentes hijos de App.js

  // *****************************************************************************************************************
  // EJEMPLO
  // pasamos hola al value para que "hola desde state" estén disponibles a TODOS los demás componentes.
  // return (
  //   <CategoriasContext.Provider
  //     value={{
  //       hola
  //     }}
  //   >
  //     {props.children}
  //   </CategoriasContext.Provider>
  // )
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // FIN EJEMPLO, COMIENZO DEL PROYECTO
  // *****************************************************************************************************************

  //Creamos el state del Context
  const [categorias, guardarCategorias] = useState([]);

  // Ejecutar el llamado a la API
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

      const categorias = await axios.get(url);

      guardarCategorias(categorias.data.drinks);
    }

    obtenerCategorias();
  }, []); // Dejamos las dependencias vacías porque queremos que se ejecute una sola vez (al iniciar la aplicación) 
  // ya que las categorías de bebida no cambian.

  // Pasamos categorias al value para que estén disponibles a TODOS los demás componentes.
  return (
    <CategoriasContext.Provider
      value={{
        categorias
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  )

}

export default CategoriasProvider;

// Es necesario exportar el Provider hacia el componente padre App para convertir al componente 
// <CategoriasProvider></CategoriasProvider>  en el componente principal de App.js que (al encerrar a todos los demás 
// componentes de la App) permitirá que el flujo de TODOS los datos, valores y formulas se sigan realizando
// desde el componente padre "APP" hacia abajo como siempre fue el caso en React.