import React from 'react';
// { Fragment } ya no es necesario una vez qeu tenemos el primer Provider.
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';

// Importando los Providers
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import ModalProvider from './context/ModalContext';


function App() {

  // Haciendo que el nuevo componente principal <CategoriasProvider> encierre a todos los demás 
  // componentes de la App, logramos que el fluyo de TODOS los datos, valores y formulas se sigan realizando
  // desde el componente padre "APP" hacia abajo.

  // Lo mismo con <RecetasProvider>, lo importante es respetar los ordenes de apertura y cierre, el que
  // se abre primero, se debe cerrar ultimo como siempre con cualquier elemento en HTML.

  // Los context fluyen hacia abajo, eso también es importante tenerlo en cuenta, porque por ejemplo, si se hace:

  //  <CategoriasProvider>
  //      <Header />
  //          <RecetasProvider>

  // Los context de Recetas no estarán disponibles en Header.

  return (

    <CategoriasProvider>

      <RecetasProvider>

        <ModalProvider>

          <Header />

          <div className='container mt-5' >
            <div className='row' >

              <Formulario />

            </div>

            <ListaRecetas />

          </div>

        </ModalProvider>

      </RecetasProvider>

    </CategoriasProvider>

  );
}

export default App;