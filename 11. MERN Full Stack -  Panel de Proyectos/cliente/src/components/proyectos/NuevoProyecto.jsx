import React, { Fragment, useState, useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario (originado en proyectoState.jsx y disponible globalmente) 
    const proyectosContext = useContext(ProyectoContext);
    const {
        formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError, cancelarFormulario
    } = proyectosContext;

    // State inicial y LOCAL para formulario de un nuevo proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    // Destructuring
    const { nombre } = proyecto;

    //Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        })
    }

    // Submit Nuevo Proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        // validar el proyecto
        if (nombre.trim() === '') {
            mostrarError();
            return;
        };

        //agregar al state
        agregarProyecto(proyecto);

        //reiniciar el formulario localmente usando el state local.
        // Si bien el formulario se cierra desde reducer, hay q resetear el campo de input.
        guardarProyecto({
            nombre: ''
        })

    }

    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    };

    // Ocultar el formulario y resetear el campo de input
    const onClickCancelarFormulario = () => {
        cancelarFormulario();

        guardarProyecto({
            nombre: ''
        })
    };

    return (

        <Fragment>

            {formulario ? (

                null

            ) : (
                    <button
                        type='button'
                        className='btn btn-block btn-primario'
                        onClick={onClickFormulario}
                    >Nuevo Proyecto</button>
                )}



            {formulario ? (
                <form
                    action=""
                    className='formulario-nuevo-proyecto'
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Nombre Proyecto'
                        name='nombre'
                        value={nombre}
                        onChange={onChangeProyecto}
                    />

                    <input
                        type="submit"
                        className='btn btn-primario btn-block'
                        value='Agregar Proyecto'
                    />

                    <button
                        type='button'
                        className='btn btn-block btn-cancelar'
                        onClick={onClickCancelarFormulario}
                    >Cancelar</button>
                </form>

            ) : null}

            {errorformulario ? <p className='mensaje error'>El nombre del Proyecto es obligatorio</p> : null}

        </Fragment>


    );
}

export default NuevoProyecto;