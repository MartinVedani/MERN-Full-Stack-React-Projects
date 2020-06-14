//imr (import react) completa toda la información de "import" automáticamente
import React from "react";

// sfc (stateless function component) completa toda la información de "function" y "export default" automáticamente
const Producto = ({ producto, carrito, agregarProducto, productos }) => {
  // Para seleccionar productos con "onClick={() => seleccionarProducto(id)}"", debemos filtrar de entre TODOS los
  // productos, por id, el que queremos agregar al carrito, por eso, ademas de importar productos uno por uno via
  // const Producto = ({producto, ...}), también importamos el array completo de productos con un objeto adicional
  // dentro de la const Producto = ({..., productos }).

  const { nombre, precio, id } = producto;
  // const { nombre, precio, id } descompone a cada elemento del array [productos, ...] que importamos individualmente
  // via const Producto = ({producto, ...}). Esto nos permite extraer dichos atributos y ahorrarnos luego de tener
  // que usar producto.nombre o producto.precio en <h2>{nombre}</h2> por ejemplo.

  // Agregar un producto al carrito mediante "onClick={() => seleccionarProducto(id)}"
  const seleccionarProducto = (id) => {
    // En React, a diferencia de javaScript tradicional, los eventos como "onClick" se manejan con funciones arrow
    // de la siguiente forma: "() => function() "
    const producto = productos.filter((producto) => producto.id === id)[0];
    // Utilizamos index[0] para guardar el único objeto DENTRO del nuevo array que genera .filter() - así nos
    // evitamos de guardar un array completo de 1 solo objeto que solo agregaría una jerarquía que no es necesaria).
    // La diferencia es para guardar solo {x} en vez de [{x}] ya que [{x}][0] = {x}. Y, a medida que vayamos agregando
    // nuevos productos al carrito, la estructura será [{x}, {y}, {etc}] en vez del algo más
    // ineficiente como [ [{x}],[{y}], [{etc}}] ].
    agregarProducto([...carrito, producto]);
    // Los 3 puntos en "...carrito" son un "spread operator" o "rest operator" y se usan para clonar el estado o
    // contenido actual del array "carrito" y así poder agregar un producto adicional. De otra forma, cada vez que se
    // agrega un nuevo producto, se sobre-escribe y borra el estado o contenido anterior.

    // Para NO usar el index[0] en ".filter((producto) => producto.id === id)[0];", se puede usar el spread
    // operator "..." frente a producto dentro de la función "agregarProductos(...carrito, ...producto);".
  };

  // Eliminar un producto del carrito mediante "onClick={() => eliminarProducto(id)}"
  const eliminarProducto = (id) => {
    // Usamos filter() para dejar pasar (o seguir existiendo) a todos los ids que son DIFERENTES al id del prod que
    // queremos eliminar, y creamos el nuevo array productos sin el id eliminado.
    const productos = carrito.filter((producto) => producto.id !== id);

    //colocar el array con los productos que sobreviven nuevamente en el state.
    agregarProducto(productos);
  };

  // Dentro de los ()s del return se recomiendo no utilizar la estructura if/else. En reemplazo, lo que se
  // recomienda es usar un ternario donde "?" equivale al "if" y ":" equivale al "else".
  // Le damos 2 botones al componente producto, "Comprar" para ser utilizado en el listado de productos fuera del
  // carrito, y el otro "Eliminar" para ser usado cuando quiero remover un producto dentro del carrito.
  // Parece complicado, pero en App.js podemos ver que "productos={productos}" existe dentro de <Producto/> y NO
  // existe dentro de <Carrito />.
  return (
    <div>
      <h2>{nombre}</h2>

      <p> $ {precio}</p>

      {productos ? (
        <button type="button" onClick={() => seleccionarProducto(id)}>
          Comprar
        </button>
      ) : (
        <button type="button" onClick={() => eliminarProducto(id)}>
          Eliminar
        </button>
      )}
    </div>
  );
};

// $ en "<p> $ {precio}</p>" no es para llamar a la variable ${precio} como en jQuery o javaScript, simplemente se
// imprime el signo $ frente al número del {precio}.

export default Producto;
