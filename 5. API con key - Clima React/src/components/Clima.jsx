import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({ resultado }) => {

  //extraer los valores
  const { name, main } = resultado;

  if (!name) return null; //antes de consultarAPI no habrá nada.

  // Para convertir grados Kelvin a ºC (código html para imprimir ºC es &#x2103;)
  const kelvin = 273;

  return (
    <div className='card-panel white col s12'>
      <div className='black-text'>
        <h2>El clima de {name} es:</h2>
        <p className='temperatura'>
          {parseFloat(main.temp - kelvin, 10).toFixed(2)}
          <span> &#x2103; </span>
        </p>

        <p>Temperatura Máxima:
          {parseFloat(main.temp_max - kelvin, 10).toFixed(2)}
          <span> &#x2103; </span>
        </p>

        <p>Temperatura Mínima:
          {parseFloat(main.temp_min - kelvin, 10).toFixed(2)}
          <span> &#x2103; </span>
        </p>

      </div>

    </div>
  );
}

// parseFloat() vs parseInt() base 8 vs. base 10
// https://stackoverflow.com/questions/8555649/second-argument-to-parsefloat-in-javascript

Clima.propTypes = {
  resultado: PropTypes.object.isRequired,
}

export default Clima;