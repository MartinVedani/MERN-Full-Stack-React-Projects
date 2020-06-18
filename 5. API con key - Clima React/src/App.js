import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  // state (se lo pasamos también al Formulario para no tener useStates de más ni varios nombres diferentes)
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  // extraer ciudad y pais
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

      // estructura: https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY

      // Consigue tu api key (appid) en: https://home.openweathermap.org/api_keys

      if (consultar) {

        const appId = 'e1ba10d7ee567809b34748172e177106';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);

        //reseatear al component principal para poder hacer multiples consultas
        guardarConsultar(false);

        // detecta si hubo algún error en la consulta
        if (resultado.cod === '404') {
          guardarError(true);
        } else {
          guardarError(false);
        };
      }
    }

    // llamamos a la función desde useEffect mismo
    consultarAPI();

    //eslint-disable-next-line
  }, [consultar]);

  // Usamos la línea "//eslint-disable-next-line" para que el compilador no nos pida que agreguemos las dependencias
  // de "ciudad" y "pais" ya que las estamos usando en el url. No necesitamos estas dependencias porque ya están
  // incluidas en "consultar" - pero el compilador no sabe TANTO y de esta forma anulamos el mensaje de error espurio.
  // Ponemos el foco en el cambio de estado de [consultar] una vez que los campos de consulta están completos y  
  // validados para que useEffect no reacciones y consulte la api mientras que el usuario escribe caracteres en 
  // los campos de ciudad y país.

  // CARGA CONDICIONAL DE COMPONENTES EN REACT
  let componente;
  if (error) {
    componente = <Error mensaje='No hay resultados' />
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (

    <Fragment>
      <Header
        titulo='Clima React App'
      />

      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>

            <div className='col m6 s12'>
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>

            <div className='col m6 s12'>

              {componente}

            </div>

          </div>

        </div>

      </div>

    </Fragment>
  );
}

export default App;
