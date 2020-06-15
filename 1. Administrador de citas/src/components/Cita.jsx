import React from "react";
import PropTypes from "prop-types"; // para documentar componentes al final, antes de exportar

const Cita = ({ cita, eliminarCita }) => {
  //Extraer valores con {}
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  return (
    <div className="cita">

      <p>Mascota: <span>{mascota}</span></p>
      <p>Dueño: <span>{propietario}</span></p>
      <p>Fecha: <span>{fecha}</span></p>
      <p>Hora: <span>{hora}</span></p>
      <p>Síntomas: <span>{sintomas}</span></p>

      <button
        className="button eliminar u-full-width"
        onClick={() => eliminarCita(cita.id)}
      >Eliminar</button>

    </div>
  );
};

// onClick={() => eliminarCita(cita.id)}
// "()=>" para esperar al click
//  cuando ocurre el click, the usa la función importada y se le pasa el id

Cita.propTypes = { // propTypes camelCase
  cita: PropTypes.object.isRequired,//PropType con doble mayúscula, es raro y causa problemas.
  eliminarCita: PropTypes.func.isRequired
}

export default Cita;
