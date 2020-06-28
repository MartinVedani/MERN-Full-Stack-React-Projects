// *****************************************************************************************************************
// TEMPLATE PARA TODOS LOS CONTEXT
// (imr + tab)
// import React, { createContext } from 'react';
//
// crear el context manualmente
// export const RecetasContext = createContext();
//
// (sfc + tab)
// const RecetasProvider = (props) => {
//
// manualmente <RecetasContext.Provider + props-children
//   return (
//     <RecetasContext.Provider
//        value={{
//          ....
//        }}
//      >
//       {props.children}
//     </RecetasContext.Provider>
//   );
// }
//
// export default RecetasProvider;
// *****************************************************************************************************************

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
//imports van primero, export van después
export const RecetasContext = createContext();

const RecetasProvider = (props) => {

  // creamos el state de busqueda y lo pasamos al context global con el value de <RecetasContext.Provider>
  const [busqueda, buscarRecetas] = useState({
    nombre: '',
    categoria: ''
  });

  // DECONSTRUCTING (de-structuring) busqueda
  const { nombre, categoria } = busqueda;

  // creamos el esta para consultar la API
  const [consultar, guardarConsultar] = useState(false);

  // creamos el state donde guardaremos las recetas obtenidas desde la API
  const [recetas, guardarRecetas] = useState([]);

  // consultamos la API cuando los datos de busqueda cambian
  useEffect(() => {

    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURI(nombre)}&c=${encodeURI(categoria)}`;

        const resultado = await axios.get(url);

        //console.log(resultado.data.drinks);
        guardarRecetas(resultado.data.drinks);
      }
      obtenerRecetas();
    }

    // eslint-disable-next-line
  }, [busqueda]);

  return (
    <RecetasContext.Provider
      value={{
        buscarRecetas,
        guardarConsultar,
        recetas
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
}

export default RecetasProvider;