//imr (import react) completa toda la información de "import" automáticamente
import React from "react";

//sfc (stateless function component) completa toda la información de "function" y "export default" automáticamente
const Footer = ({ fecha }) => (
  // si no necesitas código javascript fuera del return, se puede eliminar el return y las {}s, dejándo solo ()s.
  // este truco NO funciona cuando se usa "function declaration": function Header(){...};
  // debe usarse la "function expression": const Footer = () => (...); o const Footer = () => {return(...)};
  // No hay diferencia en términos de performance.

  <footer>
    <p>Todos los derechos reservados &copy; {fecha} </p>
  </footer>
);

export default Footer;
