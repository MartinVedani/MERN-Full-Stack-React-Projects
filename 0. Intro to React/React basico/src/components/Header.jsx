//"Header.jsx": el nombre de los componentes (y el nombre del archivo .jsx o .js siempre en mayúscula)

//imr (import react) completa toda la información de "import" automáticamente
import React from "react";

// props se importan desde APP y se usan de 2 formas:
// Método nuevo: ({ nombre }) y {nombre}; o
// Método más antigüo (props) y {props.nombre}

// ***********************************
// Método más nuevo de utilizar props
// ***********************************

function Header({ titulo }) {
  // todo el código javascript que no se vea en pantalla va fuera del return pero dentro de la función que
  // generá los elementos HTML.

  return (
    //todo lo que será visible en pantalla va dentro del return.

    <h1 id="encabezado" className="encabezado">
      {titulo}
    </h1>

    // class es una palabra reservada de javaScrip, debemos usar className para que en HTML se lea y
    // ejecute como class. Con id no hay problema porque no es una palabra reservada de .js
  );
}

// *************************************
// Método más antigüo de utilizar props
// *************************************

// function Header(props) {
//   return (
//     <h1 id="encabezado" className="encabezado">
//       {props.titulo}
//     </h1>
//   );
// }

export default Header;
