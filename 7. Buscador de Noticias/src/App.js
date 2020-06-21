import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';

function App() {

  // Una vez que tenemos la categoría de noticias seleccionada vía el custom hook "useSelect" y el estate del 
  // Formulario.jsx actualizado con dicha categoría, la tenemos que pasar desde <Formulario /> a App.js que es 
  // el componente padre.

  // Para esto, en App.js, necesitamos un nuevo state que reciba la "categoría de noticias" seleccionada en 
  // <Formulario />. Para traer dicha categoría a App.js, inicializamos un nuevo useState('') en App.js como un 
  // string vacío.
  // Para que CUANDO EL USUARIO HAGA CLICK EN SUBMIT, este nuevo state se actualice en App.js con la categoria 
  // seleccionada vía "useSelect", pasamos la función "guardarCategoria" a <Formulario /> para que desde <Formulario/>
  // podamos cambiar el state de App.js
  const [categoria, guardarCategoria] = useState('');

  // Lo mismo para Pais
  const [pais, guardarPais] = useState('');

  // Finalmente, necesitamos un state para guardar las noticias de la API que será un arreglo con muchos elementos.
  // Y, pasaremos noticias, al componente <ListadoNoticias /> para que las muestre en la página.
  const [noticias, guardarNoticias] = useState([]);

  // Usamos useEffect para que React se de por enterado una vez que App.js tiene la categoría seleccionada por
  // el usuario y consulte la API
  // la API
  useEffect(() => {

    // Evitar la carga inicial
    if (pais === '' || categoria === '') return;

    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${pais}&category=${categoria}&apiKey=d58e1728d5de46578be820c5061ab105`

      const respuesta = await fetch(url).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      }).catch(function (err) {
        alert('Google News API ya no es gratis por lo que este proyecto solo funciona desde localhost \r\n \r\n Google News API is no longer free so this app will only work from localhost');
      });

      guardarNoticias(respuesta.articles);
    }
    consultarAPI();
  }, [pais, categoria]);

  return (
    <Fragment>

      <Header
        titulo='Buscador de Noticias'
      />

      <div className='container white'>
        <Formulario
          guardarCategoria={guardarCategoria}
          guardarPais={guardarPais}
        />

        <ListadoNoticias
          noticias={noticias}
        />
      </div>

    </Fragment>
  );
}

export default App;
