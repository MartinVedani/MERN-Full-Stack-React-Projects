import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types"; // para documentar componentes al final, antes de exportar

// creamos el Formulario, importando crearCita desde App.js
const Formulario = ({ crearCita }) => {
  // Crear State de Cita con la función actualizarCita() para cambiar el state.
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  //Usamos un state adicional para errores al completar el formulario
  // Usamos "false" ya que al comenzar, no hay errores cuando todos los campos están vacíos
  const [error, actualizarError] = useState(false);

  // Usamos la función actualizarState() para actualizar el State cada vez que el usuario escribe un input
  // en el formulario. "e" es el evento. Al ser 1 solo parámetro, no requiere paréntesis.
  // e.target.name devuelve el campo en el que el usuario esta escribiendo.
  // e.target.value devuelve lo que el usuario escribió.
  const actualizarState = e => {
    // cita.mascota = e.target.value NO respeta las reglas de React, hay que usar la función actualizarCita() para
    // cambiar el estado actual del State.
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
      // Primero usamos ...cita para clonar el estado de "cita" al pasar o comenzar con un nuevo campo y NO
      // perder la información de los inputs en otros campos.

      // [e.target.name] es el atributo "name" de cada elemento de input del formulario (mascota,propietario, etc)
      // y  mediante e.target.value  se linkea el contenido que el usuario escribe en cada uno de
      // los campos "mascota, propietario, fecha, hora, sintomas" del  array "cita".
    });
  };

  // Extraer los valores de cita para evitar tener que escribir cita.mascota, cita.propietario, etc.
  // Y los ponemos como value={...} en cada input.
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita
  const submitCita = e => {
    //Evitar el comportamiento default donde js manda al query stream por método get via url de la página
    e.preventDefault();

    // Validar que no falten datos
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return; // all agregar return, el resto del código a continuación del "IF" ya no se ejecuta.
    }

    // Eliminar el mensaje de error en caso de haber existido en algún momento
    actualizarError(false);

    // Asignar id (hasta que tengamos una base de datos que lo haga en el backend)
    // en la terminal usams el comando: npm i uuid, importamos uuid at principio de este archivo, y utilizamos uuid
    // de la siguiente forma:
    cita.id = uuid();

    // Crear la cita, utilizando la función crearCita() que importamos desde App.js
    // En App.js, crearCita()  agrega esta nueva cita creada aquí, al listado de citas existentes.
    crearCita(cita);

    // Reiniciar el formulario para que la información grabada no permanezca. Los valures se reinician porque
    // utilizamos value={atributo} para cada input debajo.
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  // Agrega ternario (no se pueda usar IF dentro de return) para mensaje es caso de error = true
  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = { // propTypes camelCase
  crearCita: PropTypes.func.isRequired //PropType con doble mayúscula, es raro y causa problemas.
}

export default Formulario;
