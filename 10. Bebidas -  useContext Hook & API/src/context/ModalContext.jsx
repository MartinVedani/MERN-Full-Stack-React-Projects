// (imr + tab)
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Crear context manualmente
export const ModalContext = createContext();

// (sfc + tab)
const ModalProvider = (props) => {

  // state del provider, null hasta que el usuario vea un trago que le gusta y haga click en "ver".
  const [idreceta, guardarIdReceta] = useState(null);
  const [informacion, guardarReceta] = useState({});

  // una vez que tenemos un id de receta, llamar a la API
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURI(idreceta)}`

      const resultado = await axios.get(url);

      guardarReceta(resultado.data.drinks[0]);

    }

    obtenerReceta();

  }, [idreceta])

  // manualmente ModalContext.Provider y props.children, y todo lo q quiero hacer disponible 
  // globalmente via value={{ ... }}
  return (
    <ModalContext.Provider
      value={{
        guardarIdReceta,
        informacion,
        guardarReceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;



