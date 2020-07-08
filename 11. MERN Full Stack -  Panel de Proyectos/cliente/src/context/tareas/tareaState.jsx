import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    CANCELAR_AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    CANCELAR_ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errorTarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state (deconstructing)
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear las funciones CRUD con dispatch para cada tipo de estado ('type' de 'state')

    //Obtener las tareas de un proyecto especificado por id
    const obtenerTareas = async proyecto => {

        try {

            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
            // al enviar proyecto como params, debo actualizar tareaController para leer proyecto como req.query 
            // (antes era req.body)

            //console.log(resultado.data.tareas);

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }



    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {

        const resultado = await clienteAxios.post('/api/tareas', tarea);
        //console.log(resultado.data.tarea);

        try {

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })

            // obtenerTareas ordenadas por prioridad
            obtenerTareas(resultado.data.tarea.proyecto);

        } catch (error) {
            console.log(error);
        }
    }

    // Cancelar AGREGAR de Tarea
    const cancelarAgregarTarea = () => {
        dispatch({
            type: CANCELAR_AGREGAR_TAREA
        })
    }

    // Validar formulario de tarea y mostrar error si es necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar un tarea
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Edita o modifica una tarea existente
    const actualizarTarea = async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

            // console.log(resultado.data.tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })

            // obtenerTareas ordenadas por prioridad
            obtenerTareas(resultado.data.tarea.proyecto);

        } catch (error) {
            console.log(error)
        }
    }

    // Extraer tarea actual para edición
    const guardarTareaActual = tarea => {

        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Remover la tarea seleccionada del state global luego de que esta ha sido editada o la edición cancelada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    // Cancelar Actualización de Tarea
    const cancelarEditTarea = () => {
        dispatch({
            type: CANCELAR_ACTUALIZAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errorTarea: state.errorTarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                cancelarAgregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
                cancelarEditTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;