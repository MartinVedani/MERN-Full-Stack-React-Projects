import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

  // Citas en localStorage =  arreglo de citas previamente agendas (existentes).

  // localStorage solo guarda strings, por lo que usamos JSON.parse para que convierta el arreglo dentro del string
  // en algo que sea fácil de manipular. 
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }


  // Arreglo principal de la App y formas de cambiar el state del arreglo principal citas.
  const [citas, guardarCitas] = useState(citasIniciales);
  // Ponemos a citasIniciales como el estado de inicio de useState 
  // (que también puede ser un arreglo vacío [] de no existir ninguna cita previa. Así, el estado inicial será
  // lo que sea que tenemos guardado en el localStorage.

  // useEffect es para poner lo que sea que haya en el state dentro del local storage, al inicializar la aplicación 
  // y también al hacer cualquier cambio. Esto es lo mismo que clonar lo existente para agregar algo nuevo
  // sin pisar y perder lo viejo al grabar lo nuevo.
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]) //[citas] es el array de dependencia, es el objeto sobre cuyo state se debe enfocar 
  // userEffect (y no otros).

  // Función que tome las citas existentes y agregue la nueva via <Formulario />. Para esto, debemos exportarla vía
  // crearCita={crearCita} dentro de <Formulario /> debajo.
  const crearCita = cita => {
    guardarCitas([
      ...citas, //clonamos las citas que ya existen dentro del State.
      cita, // y agregamos la nueva cita que viene desde <Formulario />.
      //se podría usar citas.push(cita) pero eso rompe las reglas de buenas prácticas de React.
    ]);
  };

  // Función que elimina cita por su id
  const eliminarCita = id => {
    const noEliminadas = citas.filter(cita => cita.id !== id);
    guardarCitas(noEliminadas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tu citas';

  return (
    <Fragment >

      <h1> Administrador de Pacientes </h1>

      <div className="container">

        <div className="row">

          <div className="one-half column" >

            <Formulario
              crearCita={crearCita}
            />

          </div>

          <div className="one-half column" >

            <h2 > {titulo} </h2>

            {citas.map(cita => (

              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />

            ))
            }

          </div>

        </div>

      </div>

    </Fragment>
  );
}

export default App;