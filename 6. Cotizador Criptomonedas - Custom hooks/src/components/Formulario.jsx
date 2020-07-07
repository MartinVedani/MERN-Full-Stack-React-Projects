import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import PropTypes from 'prop-types';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color .3s ease;

  &:hover{
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {

    // state del listado de Criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);

    // state de error
    const [error, guardarError] = useState(false);


    let MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'CAD', nombre: 'Dolar Canadiense' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'AUD', nombre: 'Dolar Australiano' },
        { codigo: 'NGN', nombre: 'Naira de Nigeria' },
        { codigo: 'ARS', nombre: 'Peso Argentino' },
        { codigo: 'BRL', nombre: 'Real Brasileño' },
        { codigo: 'CLP', nombre: 'Peso Chileno' },
        { codigo: 'UYU', nombre: 'Peso Uruguayo' },
        { codigo: 'COP', nombre: 'Peso Colombiano' },
        { codigo: 'PEN', nombre: 'Sol de Perú' },
        { codigo: 'PYG', nombre: 'Guaraní de Paraguay' },
        { codigo: 'BOB', nombre: 'Boliviano' },
        { codigo: 'VES', nombre: 'Bolivar Soberano de Venezuela' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'CHF', nombre: 'Franco Suizo' },
        { codigo: 'NOK', nombre: 'Corona de Noruega' },
        { codigo: 'SEK', nombre: 'Corona de Suecia' },
        { codigo: 'DKK', nombre: 'Corona de Dinamarca' },
        { codigo: 'TRL', nombre: 'Lira Turca' },
        { codigo: 'PLN', nombre: 'Zloty de Polonia' },
        { codigo: 'BGN', nombre: 'Leva de Bulgaria' },
        { codigo: 'HRK', nombre: 'Kuna de Croacia' },
        { codigo: 'CZK', nombre: 'Corona de República Checa' },
        { codigo: 'HUF', nombre: 'Forinto de Hungría' },
        { codigo: 'RON', nombre: 'Leu de Rumania' },
        { codigo: 'RUB', nombre: 'Rublo Ruso' },
        { codigo: 'JPY', nombre: 'Yen Japones' },
        { codigo: 'CNY', nombre: 'Yuan Chino' },
        { codigo: 'TWD', nombre: 'Dolar de Taiwan' },
        { codigo: 'INR', nombre: 'Rupia de India' },
        { codigo: 'SAR', nombre: 'Rial de Arabia Saudita' },
        { codigo: 'QAR', nombre: 'Rial de Catar' },
        { codigo: 'AED', nombre: 'Dírham de los Emiratos Árabes Unidos' },
        { codigo: 'KRW', nombre: 'Won de Corea del Sur' },
    ];

    // Ordenar alfabéticamente MONEDAS
    function comparar_nombreMonedas(a, b) {
        // a ANTES que b en el orden de sort
        if (a.nombre < b.nombre) {
            return -1;
            // a DESPUÉS que b en el orden de sort
        } else if (a.nombre > b.nombre) {
            return 1;
            // a y b son lo mismo
        } else {
            return 0;
        }
    };

    // Ordenar alfabéticamente CRIPTOMONEDAS
    function comparar_nombreCriptomonedas(a, b) {
        // a ANTES que b en el orden de sort
        if (a.CoinInfo.FullName < b.CoinInfo.FullName) {
            return -1;
            // a DESPUÉS que b en el orden de sort
        } else if (a.CoinInfo.FullName > b.CoinInfo.FullName) {
            return 1;
            // a y b son lo mismo
        } else {
            return 0;
        }
    };

    MONEDAS = MONEDAS.sort(comparar_nombreMonedas);

    // Utilizar useMoneda = (label, stateInicial, opciones)
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    // Ejecutar llamado a la API (antes de elecciones del usuario) para obtener el listado de 
    // la Top 10 criptomonedas (USD como default)
    useEffect(() => {

        const consultarAPI = async () => {

            const api_key = 'fa3c52835cc9be34eeb698b76e795e863b149313448073a04ddb241abee5ba5c';

            // Top 100 list by Market Cap Full Data (limit=100 es el máximo, mínimo es 10)
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=${api_key}`;

            const resultado = await axios.get(url);

            const resultado_desordenado = resultado.data.Data;

            const resultado_ordenado = resultado_desordenado.sort(comparar_nombreCriptomonedas);

            guardarCriptomonedas(resultado_ordenado);
        }

        // llamamos a la función
        consultarAPI();

    }, [])

    // cuando el usuario hace submit

    const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos campos están llenos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // pasar los datos al componente principal
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (

        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <SelectMoneda />

            <SelectCripto />

            <Boton
                type='submit'
                value='Calcular'
            />
        </form>

    );
}

Formulario.propType = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired,
}

export default Formulario;