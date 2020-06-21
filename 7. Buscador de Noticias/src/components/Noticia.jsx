import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Imagen = styled.img`
  color: red;
`;

const Noticia = ({ noticia }) => {
  //Extraer los datos
  const { urlToImage, url, title, description, source } = noticia;

  // Si la foto no existe o tiene problemas
  const imagen = (urlToImage) ?
    <div className='card-image'>
      <Imagen src={urlToImage}
        alt='Configuraciones muy altas de seguridad en AdBlock o Privacy Badger 
              pueden estar bloqueando la carga de imágenes'
      />
      <span className='card-title'>{source.name}</span>
    </div>
    : null;

  return (

    <div className='col s12 m6 l4'>
      <div className='card'>

        {imagen}

        <div className='card-content'>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className='card-action'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='waves-effect waves-light btn'
          >Ver Noticia Completa</a>
        </div>

      </div>
    </div>

  );
}

Noticia.propTypes = {
  noticia: PropTypes.object.isRequired,
}

export default Noticia;
