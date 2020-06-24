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

        const consultaLetra = axios.get(url_letra);
        const consultaInfo = axios.get(url_info);

        axios.all([consultaLetra, consultaInfo]).then(axios.spread((...respuestas) => {

          // usar/acceder a los resultados
          const letra = respuestas[0];
          const info = respuestas[1];
          guardarLetra(letra.data.lyrics);
          guardarInfo(info.data.artists[0]);

        })).catch(error => {
          guardarCargando(false);
          //guardarError(true);

          // reaccionar a errores.
          alert("Error: No se encontró / Not Found" + error.message)
          return;
        })

        //cambiar el estado de cargando
        guardarCargando(false);

      }

      //llamamos a la función
      consultarApiLetra();

    }, 4000);

    // eslint-disable-next-line
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
        guardarLetra={guardarLetra}
        guardarInfo={guardarInfo}
      />

      {componente}

    </Fragment>
  );
}

export default App;
