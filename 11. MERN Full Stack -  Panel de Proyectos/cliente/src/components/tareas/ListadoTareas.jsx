import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// key={tarea.tareaId} se mueve dentro de <CSSTransition> porque es el PRIMER hijo de la iteración .map
// y React asi lo requiere

const ListadoTareas = () => {

    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Obtener las tareas del proyecto en el state context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;

    // Si no hay proyecto seleccionado (en la primera carga de la aplicación)
    if (!proyecto) return null;

    // Array destructuring para extraer el proyecto actual, primero usamos corchetes para acceder al index [0]
    // ya que proyecto es un array con 1 solo elemento, de la siguiente forma [{...}]
    const [proyectoActual] = proyecto;

    // Eliminar proyecto
    const onClinkEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (

        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasproyecto.length === 0

                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (

                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames='tarea'
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>

                        ))}
                    </TransitionGroup>

                }
            </ul>

            <button
                type='button'
                className='btn btn-eliminar'
                onClick={onClinkEliminar}
            >Eliminar Proyecto &times;</button>

        </Fragment>
    );
}

export default ListadoTareas;
