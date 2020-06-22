import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoResultados from './components/ListadoResultados';

function App() {

  const [busqueda, guardarBusqueda] = useState({});
  const { termino, media } = busqueda;

  const [resultados, guardarResultados] = useState([]);
  const [paginaactual, guardarPaginalActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (Object.keys(busqueda).length === 0) return;

      const resultadosPorPagina = 30;
      const key = '17152061-631967b4b4f155ca56864eceb';
      let mediaUrl = '';

      if (media === 'videos') {
        mediaUrl = 'videos/';
      }

      const url = `https://pixabay.com/api/${mediaUrl}?key=${key}&q=${encodeURI(termino)}&per_page=${resultadosPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const json = await respuesta.json();

      guardarResultados(json.hits);

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(json.totalHits / resultadosPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      // mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }

    consultarAPI();

    // eslint-disable-next-line
  }, [busqueda, paginaactual]);

  // definir la pagina ANTERIOR
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPaginalActual(nuevaPaginaActual);
  }

  // definir la pagina SIGUIENTE
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginalActual(nuevaPaginaActual);
  }

  return (
    <div className='container'>

      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imágenes y Videos</p>

        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className='row justify-content-center'>
        <ListadoResultados
          resultados={resultados}
        />

        {(paginaactual === 1) ? null : (

          <button
            type='button'
            className='bbtn btn-info mr-1'
            onClick={paginaAnterior}
          >&laquo; Anterior</button>

        )}

        {(paginaactual === totalpaginas) ? null : (

          <button
            type='button'
            className='bbtn btn-info'
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>

        )}

      </div>
    </div>
  );
}
// API KEY for pexels: 563492ad6f9170000100000175b46b006f3642ffac982b9ba255dcd3

export default App;
