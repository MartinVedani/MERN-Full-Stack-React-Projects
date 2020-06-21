import React, { useState } from 'react';

const useSelectPais = (stateInicial) => {
  // Hacemos para países lo mismo que para categoría de noticias
  let PAISES = [
    { value: 'ae', label: 'United Arab Emirates' },
    { value: 'ar', label: 'Argentina' },
    { value: 'at', label: 'Austria' },
    { value: 'au', label: 'Australia' },
    { value: 'be', label: 'Belgium' },
    { value: 'bg', label: 'Bulgaria' },
    { value: 'br', label: 'Brazil' },
    { value: 'ca', label: 'Canada' },
    { value: 'ch', label: 'Switzerland' },
    { value: 'cn', label: 'China' },
    { value: 'co', label: 'Colombia' },
    { value: 'cu', label: 'Cuba' },
    { value: 'cz', label: 'Czechia' },
    { value: 'de', label: 'Germany' },
    { value: 'eg', label: 'Egypt' },
    { value: 'fr', label: 'France' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'gr', label: 'Greece' },
    { value: 'hk', label: 'Hong Kong' },
    { value: 'hu', label: 'Hungary' },
    { value: 'id', label: 'Indonesia' },
    { value: 'ie', label: 'Ireland' },
    { value: 'il', label: 'Israel' },
    { value: 'in', label: 'India' },
    { value: 'it', label: 'Italy' },
    { value: 'jp', label: 'Japan' },
    { value: 'kr', label: 'Korea, Republic of' },
    { value: 'lt', label: 'Lithuania' },
    { value: 'lv', label: 'Latvia' },
    { value: 'ma', label: 'Morocco' },
    { value: 'mx', label: 'Mexico' },
    { value: 'my', label: 'Malaysia' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'nl', label: 'Netherlands' },
    { value: 'no', label: 'Norway' },
    { value: 'nz', label: 'New Zealand' },
    { value: 'ph', label: 'Philippines' },
    { value: 'pl', label: 'Poland' },
    { value: 'pt', label: 'Portugal' },
    { value: 'ro', label: 'Romania' },
    { value: 'rs', label: 'Serbia' },
    { value: 'ru', label: 'Russian Federation' },
    { value: 'sa', label: 'Saudi Arabia' },
    { value: 'se', label: 'Sweden' },
    { value: 'sg', label: 'Singapore' },
    { value: 'si', label: 'Slovenia' },
    { value: 'sk', label: 'Slovakia' },
    { value: 'th', label: 'Thailand' },
    { value: 'tr', label: 'Turkey' },
    { value: 'tw', label: 'Taiwan' },
    { value: 'ua', label: 'Ukraine' },
    { value: 'us', label: 'United States of America' },
    { value: 've', label: 'Venezuela' },
    { value: 'za', label: 'South Africa' },
  ];

  //state del custom hook
  const [state, actualizarState] = useState(stateInicial);

  // Ordenar alfabéticamente PAISES
  function comparar_nombre(a, b) {
    // a ANTES que b en el orden de sort
    if (a.label < b.label) {
      return -1;
      // a DESPUÉS que b en el orden de sort
    } else if (a.label > b.label) {
      return 1;
      // a y b son lo mismo
    } else {
      return 0;
    }
  };

  PAISES = PAISES.sort(comparar_nombre);


  // en arrow functions, se da por implícito el "primer" return con => (), o sea sin las llaves. El return del hook
  // sigue siendo necesario.
  const SelectPais = () => (

    <select
      className='browser-default'
      value={state} // para que el valor automáticamente seleccionado al inicio sea = useState('ar');
      onChange={e => actualizarState(e.target.value)}
    >

      {PAISES.map(pais => (
        <option key={pais.value} value={pais.value}> {pais.label}</option>
      ))
      }

    </select >

  );

  return [state, SelectPais];;
}

export default useSelectPais;
