import React, { useContext, useState, useEffect, Fragment } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extraer si hay un proyecto activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const { agregarTarea, cancelarAgregarTarea, validarTarea, errorTarea, obtenerTareas, tareaseleccionada, actualizarTarea, limpiarTarea, cancelarEditTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada para editar
    useEffect(() => {
        if (tareaseleccionada !== null) {
            // cambiar state local
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: '',
                prioridad: ''
            })
        }
    }, [tareaseleccionada])

    // State inicial y LOCAL para formulario de una nueva tarea
    const [tarea, guardarTarea] = useState({
        nombre: '',
        prioridad: ''
    })

    // extraer el nombre de tarea con destructuring
    const { nombre, prioridad } = tarea;

    // Si no hay proyecto seleccionado (en la primera carga de la aplicación)
    if (!proyecto) return <h2 style={{ margin: '20px' }}>Selecciona un Proyecto</h2>;

    // Array destructuring para extraer el proyecto actual. Debemos usar corchetes para acceder al index [0]
    // ya que proyecto es un array con 1 solo elemento, de la siguiente forma [{...}]
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    };

    // onSubmit agregarTarea
    const onSubmit = e => {
        e.preventDefault();

        // validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        };

        // Chequeo si es edición o si es una nueva tarea
        if (tareaseleccionada === null) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // Actualizar tarea existente
            actualizarTarea(tarea);

            // Remover tarea seleccionada del state global una vez editada o la edición cancelada
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.proyectoId);

        //reiniciar el formulario localmente
        guardarTarea({
            nombre: '',
            prioridad: ''
        })
    }

    // Ocultar el formulario y resetear el campo de input
    const onClickCancelarTarea = () => {
        cancelarAgregarTarea();

        guardarTarea({
            nombre: '',
            prioridad: ''
        })
    };

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >

                <div className='contenedor-input'>
                    <input
                        type="number"
                        className='input-number'
                        placeholder='Prioridad...'
                        name='prioridad'
                        value={prioridad}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>


                {tareaseleccionada ? (
                    <Fragment>
                        <div className='contenedor-input'>
                            <input
                                type="submit"
                                className='btn btn-primario btn-submit btn-block'
                                value='Editar Tarea'
                            />
                        </div>

                        <div className='contenedor-input'>
                            <button
                                type="button"
                                className='btn btn-block btn-cancelar'
                                onClick={cancelarEditTarea}
                            >Cancelar </button>
                        </div>
                    </Fragment>

                ) : (


                        <div className='contenedor-input'>
                            <input
                                type="submit"
                                className='btn btn-primario btn-submit btn-block'
                                value='Agregar Tarea'
                            />
                        </div>


                    )}

            </form>

            {errorTarea && tareaseleccionada ? (

                <p className='mensaje error'>El nombre de la tarea es obligatorio</p>

            ) : (

                    errorTarea ? (
                        <Fragment>

                            <div className='contenedor-input'>
                                <button
                                    type='button'
                                    className='btn btn-block btn-cancelar'
                                    onClick={onClickCancelarTarea}
                                >Cancelar</button>
                            </div>

                            <p className='mensaje error'>El nombre de la tarea es obligatorio</p>

                        </Fragment>
                    ) : null)}

        </div>
    );
}

export default FormTarea;