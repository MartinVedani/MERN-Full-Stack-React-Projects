import React from 'react';
import Noticia from './Noticia';
import PropTypes from 'prop-types';

const ListadoNoticias = ({ noticias }) => {
  return (

    <div className='row'>

      {noticias.map(noticia => (

        <Noticia
          key={noticia.url}
          noticia={noticia}
        />

      ))}

    </div>

  );
}

// Siempre que hacen interaciones, React demanda un key única. En este caso, la url de las noticias
// es una buena opcion porque lso demás campos de noticias se pueden llegar a repetir.

ListadoNoticias.propTypes = {
  noticias: PropTypes.array.isRequired,
}

export default ListadoNoticias;
