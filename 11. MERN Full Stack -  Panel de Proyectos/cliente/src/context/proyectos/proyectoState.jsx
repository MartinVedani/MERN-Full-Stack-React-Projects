import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    CANCELAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    ELIMINAR_PROYECTO_ERROR,
    CANCELAR_ELIMINAR_PROYECTO_ERROR
} from '../../types';

const ProyectoState = props => {

    // El flujo de codificación de states es: 
    // TYPE (este archivo) -> STATE (dispatch + Provider al state global) -> REDUCER (case type) -> Implementación en componente

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null,
        eliminarProyectoError: false
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Siguen TODAS las funciones para el CRUD de cada state (Create, Read, Update and Delete)
    // siempre vía proyectoReducer.

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos de la base de datos
    const obtenerProyectos = async () => {

        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            // console.log(resultado.data.proyectos);

            // Enviar proyectos al state
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    // Agregar nuevo proyecto desde NuevoProyecto.jsx
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            // console.log(resultado.data);

            // Insertar nuevo proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
    }

    // Validar el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Cancelar el formulario, usando el mismo formulario state de mostrarFormulario y reseteando el input de formulario
    const cancelarFormulario = () => {
        dispatch({
            type: CANCELAR_FORMULARIO
        })
    }

    // Seleccionar el proyecto sobre el que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //  Marcar error si haya tareas existente al tratar de eliminar un proyecto
    const validarEliminarProyecto = () => {
        dispatch({
            type: ELIMINAR_PROYECTO_ERROR
        })
    }

    //  Cancelar error si haya tareas existente al tratar de eliminar un proyecto
    const cancelarEliminarProyecto = () => {
        dispatch({
            type: CANCELAR_ELIMINAR_PROYECTO_ERROR
        })
    }

    // Elimina un proyecto
    const eliminarProyecto = async proyectoId => {

        try {

            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                eliminarProyectoError: state.eliminarProyectoError,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                cancelarFormulario,
                proyectoActual,
                eliminarProyecto,
                validarEliminarProyecto,
                cancelarEliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
