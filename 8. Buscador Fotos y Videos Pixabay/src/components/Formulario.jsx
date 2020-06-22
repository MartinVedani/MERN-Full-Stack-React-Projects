import React, { useState } from 'react';
import Error from './Error';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Botones = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Formulario = ({ guardarBusqueda }) => {

  const [termino, guardarTermino] = useState('');
  const [media, guardarMedia] = useState('imagenes');
  const [error, guardarError] = useState(false);

  const buscarMedia = e => {
    e.preventDefault();

    // validar
    if (termino.trim() === '') {
      guardarError(true);
      return;
    }

    guardarError(false);
    //enviar el término y tipo de media al componente principal
    guardarBusqueda({ termino, media });
  }

  return (

    <form
      onSubmit={buscarMedia}
    >
      <div className='row'>
        <div className='form-group col-md-12'>
          <input
            type="text"
            className='form-control form-control-ls'
            placeholder='Buscar una imagen o video, ejemplo: café o New York'
            onChange={e => guardarTermino(e.target.value)}
          />

          <Botones>

            <InputRadio
              className='input_radio'
              type="radio"
              name='buscar'
              value='imagenes'
              checked={(media === 'imagenes') ? true : false}
              onChange={e => guardarMedia(e.target.value)}
            /> Imágenes

              <InputRadio
              className='input_radio'
              type="radio"
              name='buscar'
              value='videos'
              onChange={e => guardarMedia(e.target.value)}
            /> Videos

        </Botones>

          <input
            type="submit"
            className='btn btn-lg btn-danger btn-block'
            value='Buscar'
          />
        </div>
      </div>

      {error ? <Error mensaje='Agrega un término de búsqueda' /> : null}

    </form >

  );
}

Formulario.propTypes = {
  guardarBusqueda: PropTypes.func.isRequired,
}

export default Formulario;