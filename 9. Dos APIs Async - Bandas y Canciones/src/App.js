import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import Spinner from './components/Spinner';
import axios from 'axios';

function App() {

  //definir state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});

  const { artista, cancion } = busquedaLetra;

  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  const [cargando, guardarCargando] = useState(false);

  // consultar API
  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    //mostrar el spinner
    guardarCargando(true);

    setTimeout(() => {

      // API structure
      const consultarApiLetra = async () => {

        const url_letra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
        const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

        const [letra, informacion] = await Promise.all([
          await axios(url_letra), // por default, corre axios.get(url_letra)
          await axios(url_info),
        ])

        //cambiar el estado de cargando
        guardarCargando(false);

        guardarLetra(letra.data.lyrics);
        guardarInfo(informacion.data.artists[0]);
      }

      //llamamos a la función
      consultarApiLetra();

    }, 3000);

  }, [busquedaLetra]);

  const componente = (cargando) ? <Spinner /> :

    (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <Info
              info={info}
              artista={artista}
            />
          </div>
          <div className='col-md-6'>
            <Cancion
              letra={letra}
              cancion={cancion}
            />
          </div>
        </div>
      </div>
    );

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      {componente}

    </Fragment>
  );
}

export default App;
