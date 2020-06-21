import React from 'react';
import styles from './Formulario.module.css';
import PropTypes from 'prop-types';
import useSelect from '../hooks/useSelect';
import useSelectPais from '../hooks/useSelectPais';

const Formulario = ({ guardarCategoria, guardarPais }) => {

  const OPCIONES = [
    { value: 'general', label: 'General' },
    { value: 'business', label: 'Negocios' },
    { value: 'entertainment', label: 'Entretenimiento' },
    { value: 'health', label: 'Salud' },
    { value: 'science', label: 'Ciencia' },
    { value: 'sports', label: 'Deportes' },
    { value: 'technology', label: 'Tecnología' },
  ]

  // Utilizar custom hook: inicializamos con useSelect('') que da un stateInicial vacío sin opciones a la derecha 
  // del "=" y luego lo completamos con los datos a medida que vamos desarrollando la app para que se termine leyendo 
  // "useSelect('general', OPCIONES);" "General" se convierte en el estado automáticamente seleccionado en 
  // en el select al cargar la pagina ya que es el estate inicial. TAMBIÉN, será necesario poner en el
  //  <select></select> de useSelect.jsx un value={state} para que esto ocurra con "general" o cualquier otra opción,
  // como por  ej "business".

  // A la izquierda usamos el state que retorna useSelect.jsx re-nombrando al state con el nombre "categoría" 
  // (podemos cambiar el nombre sin problema mientras que respetemos el orden en el que vuelven los datos desde 
  // useSelect.jsx).
  const [categoria, SelectNoticias] = useSelect('general', OPCIONES);

  // Lo mismo para useSelectPais (las opciones las ponemos en useSelectPais.jsx para mantener el 
  // código más ordenado y ver 2 formas de comunicarnos entre componentes y hooks para hacer selecciones).
  const [pais, SelectPais] = useSelectPais('ar');

  // Una vez que tenemos la categoría seleccionada vía useSelect, se la tenemos que pasar a App.js que es el 
  // componente padre
  const buscarNoticias = e => {
    e.preventDefault();
    // submit el formulario, pasar categoria y pais a app
    guardarCategoria(categoria);
    guardarPais(pais);
  }

  return (

    <div className={`${styles.buscador} row `}>
      <div className='col s12 m8 offset-m2'>
        <form
          onSubmit={buscarNoticias}
        >
          <h2 className={styles.heading}>Encuentra noticias por categoría</h2>

          <SelectPais />
          <SelectNoticias />

          <div className='input-field col s12'>
            <input
              type='submit'
              className={`${styles.btn_block} btn-large amber darken-2`}
              value='Buscar'
            />
          </div>
        </form>
      </div>
    </div>

  );
}

Formulario.propTypes = {
  guardarCategoria: PropTypes.func.isRequired,
  guardarPais: PropTypes.func.isRequired,
};

export default Formulario;