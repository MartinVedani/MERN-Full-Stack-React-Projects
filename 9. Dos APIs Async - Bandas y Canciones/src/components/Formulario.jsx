import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Formulario = ({ guardarBusquedaLetra, guardarLetra, guardarInfo }) => {

  const [busqueda, guardarBusqueda] = useState({
    artista: '',
    cancion: '',
  });

  // extraer valores
  const { artista, cancion } = busqueda;

  //chequear errores
  const [error, guardarError] = useState(false);

  // función a cada input para leer su contenido
  const actualizarState = e => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    })
  };

  const buscarInformacion = e => {
    e.preventDefault();

    // De Existir, resetear búsquedas anteriores EXITOSAS
    guardarLetra('');
    guardarInfo({});

    //validamos
    if (artista.trim() === '' || cancion.trim() === '') {
      guardarError(true);
      return;
    }
    guardarError(false);

    // Todo bien, pasar al componente principal
    guardarBusquedaLetra(busqueda);

    // resetear form
    guardarBusqueda({
      artista: "",
      cancion: "",
    });
  }

  return (

    <div className='bg-info'>
      <div className='container'>

        <div className='row'>
          <form
            onSubmit={buscarInformacion}
            className='col card text-white bg-transparent mb-5 pt-5 pb-2'
          >
            <fieldset>
              <legend className='text-center'>Buscador Letras Canciones</legend>

              {(error) ? <p className='alert alert-danger text-center p-2'>Todos los campos son obligatorios</p> : null}

              <div className='row'>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Artista</label>
                    <input
                      type="text"
                      className='form-control'
                      name='artista'
                      placeholder='Nombre Artista, por ej. Soda Stereo'
                      onChange={actualizarState}
                      value={artista}
                    />
                  </div>
                </div>


                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Canción</label>
                    <input
                      type="text"
                      className='form-control'
                      name='cancion'
                      placeholder='Nombre Canción, por ej. De Música Ligera'
                      onChange={actualizarState}
                      value={cancion}
                    />
                  </div>
                </div>

              </div>

              <button
                type='submit'
                className='btn btn-primary float-right'
              >Buscar</button>

            </fieldset>
          </form>
        </div>
      </div>
    </div>

  );
}

Formulario.propTypes = {
  guardarBusquedaLetra: PropTypes.func.isRequired,
  guardarLetra: PropTypes.func.isRequired,
  guardarInfo: PropTypes.func.isRequired,
}

export default Formulario;
