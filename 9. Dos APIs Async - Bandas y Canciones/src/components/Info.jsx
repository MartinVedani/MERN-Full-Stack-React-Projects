import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ info, artista }) => {

  // En React no podemos usar length directamente y debemos usar Object.keys es usado porque info es un objeto {}
  if (Object.keys(info).length === 0) return null;

  const { strArtistThumb, strGenre, strStyle, strBiographyES, strBiographyEN, strDisbanded } = info;

  return (

    <div className='card border-light'>

      <div className='card-header bg-primary text-light font-weight-bold'>
        {artista}
      </div>

      <div className='card-body'>
        <img src={strArtistThumb} alt='Logo Artista' />
        <p className='card-text'>Estilo / Style: {strStyle}</p>
        <p className='card-text'>Género / Genre: {strGenre}</p>
        <p className='card-text'>Separada / Disbanded: {(strDisbanded == null || strDisbanded == '') ? 'No' : 'Yes'}</p>

        <h2 className='card-text'>Biografía en Español:</h2>
        <p className='card-text'>{strBiographyES}</p>

        <h2 className='card-text'>Biography in English:</h2>
        <p className='card-text'>{strBiographyEN}</p>

        <p className='card-text'>

          {(info.strFacebook == '' || info.strFacebook == null)
            ? null : (
              <a href={`https://${info.strFacebook}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            )}

          {(info.strTwitter === '' || info.strTwitter === null)
            ? null : (
              <a href={`https://${info.strTwitter}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            )}

          {(info.strLastFMChart === '' || info.strLastFMChart === null)
            ? null : (
              <a href={`${info.strLastFMChart}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-lastfm"></i>
              </a>
            )}

        </p>
      </div>

    </div>
  );
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
  artista: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    (props, key) => props[key] === null ? null : 'Not null'
  ]),
}

export default Info;
