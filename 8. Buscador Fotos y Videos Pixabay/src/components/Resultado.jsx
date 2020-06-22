import React from 'react';
import Vimeo from '@u-wave/react-vimeo';
import PropTypes from 'prop-types';

const Resultado = ({ resultado, vimeoId }) => {

  // extraer las variables
  let { likes, tags, views, type, previewURL, largeImageURL, pageURL } = resultado;

  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>

      <div className='card'>

        {(type === 'film' || type === 'animation') ? (

          <Vimeo
            video={vimeoId}
            width='200'
            height='130'
          />

        ) : (

            <img
              src={previewURL}
              alt={tags}
              className='card-img-top'
            />

          )}

        <div className='card-body'>
          <p className='card-text'>{likes} Me Gusta</p>
          <p className='card-text'>{views} Vistas </p>
        </div>

        <div className='card-footer'>
          <a
            href={(type === 'film' || type === 'animation') ? pageURL : largeImageURL}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-primary btn-block'
          >{(type === 'film' || type === 'animation') ? 'Bajar Video' : 'Ver Imagen'}</a>
        </div>


      </div>
    </div>
  );
}

Resultado.propTypes = {
  resultado: PropTypes.object.isRequired,
  vimeoId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    (props, key) => props[key] === null ? null : 'Not null'
  ]),
}

export default Resultado;
