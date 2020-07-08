import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {

    // Extraer si hay un proyecto activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Array destructuring para extraer el proyecto actual. Debemos usar corchetes para acceder al index [0]
    // ya que proyecto es un array con 1 solo elemento, de la siguiente forma [{...}]
    const [proyectoActual] = proyecto;

    // Obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    // Función que se ejecuta para eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);

        // Refresh tareas luego de eliminar una
        obtenerTareas(proyectoActual._id);
    }

    // Función que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        //una vez modificada, le pasamos la tarea completa al state global
        actualizarTarea(tarea);
    }

    // Agrega nua tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className='tarea sombra'>

            <p>Prioridad: {tarea.prioridad ? tarea.prioridad : 'indef'}</p>

            <div>
                <span id='separador_tarea'> | </span>
            </div>

            <p>{tarea.nombre}</p>

            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>

            <div>
                <span id='separador_tarea'> | </span>
            </div>

            <div className='estado'>
                {tarea.estado
                    ? (
                        <button
                            type='button'
                            className='completo'
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                    : (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

        </li>
    );
}

Tarea.propTypes = {
    tarea: PropTypes.object.isRequired,
}

export default Tarea;