import React, { useState } from 'react';

// los inputs entran sin {} a useSelect en hooks, diferente que al usar una stateless function component "sfc".
const useSelect = (stateInicial, opciones) => {

  //state del custom hook
  const [state, actualizarState] = useState(stateInicial);

  // en arrow functions, se da por implícito el "primer" return con => (), o sea sin las llaves. El return del hook
  // sigue siendo necesario.
  const SelectNoticias = () => (

    <select
      className='browser-default'
      value={state} // para que el valor automáticamente seleccionado al inicio sea = useState(stateInicial);
      onChange={e => actualizarState(e.target.value)}
    >

      {opciones.map(opcion => (
        <option key={opcion.value} value={opcion.value} > {opcion.label}</option>
      ))
      }

    </select >

  );

  return [state, SelectNoticias];

}

export default useSelect;