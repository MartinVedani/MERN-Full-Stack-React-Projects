import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarPregunta }) => {

  //definir el state
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  //función que lee el presupuesto
  const definirPresupuesto = e => {
    guardarCantidad(parseInt(e.target.value))
    //usamos parseInt para convertir el string que viene del formulario en número
  }

  //submit para definir presupuesto
  const agregarPresupuesto = e => {
    e.preventDefault();

    // validar
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true);
      return; //salir de la función sin ejecutar el resto del código
    }

    // si pasa la validación
    guardarError(false);
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    actualizarPregunta(false);
  }

  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>

      <h2>{error ? <Error mensaje='El Presupuesto es Incorrecto' /> : null}</h2>

      <form
        onSubmit={agregarPresupuesto}
      >
        <input type="number"
          className="u-full-width"
          placeholder="Coloca tu presupuesto"
          onChange={definirPresupuesto}
        />

        <input
          type="submit"
          className="button-primary u-full-width"
          value="Definir Presupuesto"
        />

      </form>
    </Fragment>


  );
}

Pregunta.propTypes = {
  guardarPresupuesto: PropTypes.func.isRequired,
  guardarRestante: PropTypes.func.isRequired,
  actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;