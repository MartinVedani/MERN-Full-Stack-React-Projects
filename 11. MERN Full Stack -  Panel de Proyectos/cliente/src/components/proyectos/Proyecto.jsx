import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {

    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    //Función para agregar el proyecto actual y sus tareas
    const seleccionarProyecto = proyectoId => {
        proyectoActual(proyectoId); // Fijar el proyecto actual
        obtenerTareas(proyectoId); // Filtrar las tareas cuando se de click
    }

    return (

        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    );
}

Proyecto.propTypes = {
    proyecto: PropTypes.object.isRequired,
}

export default Proyecto;