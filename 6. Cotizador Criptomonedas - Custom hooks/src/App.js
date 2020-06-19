import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
@media (min-width: 992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr); //1 fracción = 50 y 50
  column-gap: 2rem;
}
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    //evitamos la ejecución la primera v ez antes que el usuario haga sus elecciones
    if (moneda === '') return;

    // Ejecutar llamado a la API otra vez con las elecciones del usuario traemos FULL DATA
    const cotizarCriptomoneda = async () => {

      // Multiple Symbols Full Data
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}` //&api_key=${apiKey}`;

      const resultado = await axios.get(url);

      //mostrar el spinner
      guardarCargando(true);

      //ocultar el spinner y mostrar el resultado
      setTimeout(() => {

        //cambiar el estado de cargando
        guardarCargando(false);

        //guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

      }, 3000);
    }

    // llamamos a la función
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt='imagen cripto'
        />
      </div>

      <div>
        <Heading> Cotiza Criptomonedas al instante</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>

  );
}

export default App;
