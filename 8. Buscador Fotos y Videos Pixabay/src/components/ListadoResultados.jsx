import React from 'react';
import Resultado from './Resultado';
import PropTypes from 'prop-types';

const ListadoResultados = ({ resultados }) => {
  return (
    <div className='col-12 p5 row'>
      {resultados.map(resultado => (

        <Resultado
          key={resultado.id}
          resultado={resultado}
          vimeoId={(resultado.type === 'film' || resultado.type === 'animation') ? String(resultado.videos.tiny.url.slice(34, 43)) : null}
        />
      ))}
    </div>

  );
}

ListadoResultados.propTypes = {
  resultados: PropTypes.array.isRequired,
}

export default ListadoResultados;