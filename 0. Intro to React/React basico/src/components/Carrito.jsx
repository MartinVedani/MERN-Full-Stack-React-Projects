import React from "react";
import "./carrito.css"; //a diferencia de componentes, aquí sí hay que ponerle la extensión .css
import Producto from "./Producto"; //sin extension ".jsx o .js" y sin "/components" porque estamos en la misma carpeta.

// Al importar el componente Producto, importamos todos sus métodos y comportamientos y ya podemos usarlo igual
// que en App.js, mediante el llamado <Producto />

const Carrito = ({ carrito, agregarProducto }) => (
  // <Carrito /> exporta "agregarProducto={agregarProducto}" desde App.js y aquí la importamos
  // para poder cambiar el estado de carrito al eliminar productos.

  // Dentro de los ()s del return (implícito en este caso porque no esta escrito) se recomiendo no utilizar la
  // estructura if/else. En reemplazo, lo que se recomienda es usar un ternario donde "?" equivale al "if"
  // y ":" equivale al "else".

  <div className="carrito">
    <h2>Tu carrito de compras</h2>

    {carrito.length === 0 ? (
      <p>No hay elementos en el carrito</p>
    ) : (
      carrito.map((producto) => (
        <Producto
          key={producto.id} //recordemos que necesita un id único
          producto={producto} // pasamos el objeto completo, dentro de carrito el botón será "Eliminar"
          carrito={carrito} // pasamos carrito para poder usar filter() y cambiarle el estado (eliminar productos)
          agregarProducto={agregarProducto} // con agregarProducto() en el botón "Eliminar" de Producto.jsx.
        />
      ))
    )}
  </div>
);

export default Carrito;
