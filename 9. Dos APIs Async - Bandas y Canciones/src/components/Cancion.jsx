import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Cancion = ({ letra, cancion }) => {

  if (letra.length === 0) return null;

  return (

    <Fragment>

      <h2>{cancion}</h2>
      <p className='letra'>{letra}</p>

    </Fragment>

  );
}

Cancion.propTypes = {
  letra: PropTypes.string.isRequired,
  cancion: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    (props, key) => props[key] === null ? null : 'Not null'
  ]),
}

export default Cancion;