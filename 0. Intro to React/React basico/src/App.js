import React, { Fragment, useState } from "react";
import Header from "./components/Header"; //sin extension ".jsx o .js"
import Footer from "./components/Footer"; //sin extension ".jsx o .js"
import Producto from "./components/Producto"; //sin extension ".jsx o .js"
import Carrito from "./components/Carrito"; //sin extension ".jsx o .js"

function App() {
  // Se puede agregar todo el javascript que se desea fuera del return sin que se muestre en pantalla.

  // A continuación creamos un array de productos utilizando el React Hook "useState" para monitorear el
  // estado actual de "productos". guardarProductos es la forma de modificar dicho estado actual.

  // En React el "state" de carrito no se modifica directamente con carrito.push() u
  // otras formas tradicionales de agregar o modificar atributos. El cambio de state debemos hacerlo a través de
  // funciones como guardarProducto (esto es una pregunta de entrevista laboral).

  // Vamos a utilizar la función agregarProducto() en el botón de "seleccionarProducto = (id)" en Producto.jsx
  // exportándola debajo vía <Producto /> como prop.

  const [productos, guardarProductos] = useState([
    { id: 1, nombre: "Camisa ReactJS", precio: 50 },
    { id: 2, nombre: "Camisa VueJS", precio: 40 },
    { id: 3, nombre: "Camisa NodeJS", precio: 30 },
    { id: 4, nombre: "Camisa Angular", precio: 20 },
  ]);

  // State para un carrito de compras que se inicializa vacío
  const [carrito, agregarProducto] = useState([]);

  // Obtener fecha
  const fecha = new Date().getFullYear();

  return (
    // Todo lo que deba ser visible en la pantalla debe in dentro de return.
    // Sin "import React, {Fragment} from "react" " y "" <Fragment> ... </Fragment> " , vamos a necesitar
    // 1 contenedor <div> padre para todo lo que necesitemos mostrar en la pantalla.
    // El <Fragment> es más eficiente porque no se crea en HTML, el <div> sí.

    // Al componente Header le pasamos 2 "props", "titulo" y "numero",  para ser utilizadas en el archivo
    // Header.jsx Los props pasan desde el component padre "App" hacia los componentes hijos "Header",
    // "Footer", etc.

    // Al componente Producto, le pasamos TODO el array [productos, ...] con productos={productos} y también le
    // pasamos cada elemento uno por uno dentro del array con {producto.map(...)}, ya que, a diferencia de
    // forEach(), map() retorna un valor. Recordemos que forEach() simplemente recorre cada elemento en un
    // array sin retornar nada.

    // key en <Producto> es importante ya que siempre hay que pasarle algo que sea único.

    <Fragment>
      <Header titulo="Tienda Virtual" numero={20} />

      <h1>Lista de Productos</h1>

      {productos.map((producto) => (
        <Producto
          key={producto.id}
          productos={productos}
          producto={producto}
          carrito={carrito}
          agregarProducto={agregarProducto}
        />
      ))}

      <Carrito carrito={carrito} agregarProducto={agregarProducto} />

      <Footer fecha={fecha} />
    </Fragment>
  );
}

// <Carrito /> necesita "agregarProducto={agregarProducto}" para poder cambiar el estado de carrito al eliminar
// productos.

export default App;
