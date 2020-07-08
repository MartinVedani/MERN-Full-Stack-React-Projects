// El flujo de codificación de states es: 

// TYPE (este archivo) -> STATE (dispatch + Provider al state global) -> REDUCER (case type) -> Implementación en componente

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

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }

        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }

        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false, // para cerrar el formulario de nuevo proyectos
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }

        case CANCELAR_FORMULARIO:
            return {
                ...state,
                formulario: false,
                errorformulario: false,
            }

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                // filter agarra todo lo que no tenga el id que queremos borrar 
                // 'filter' es un nombre que confunde en esta función nativa de javascript.
                //  Deja pensar que deja afuera el true, pero es lo contrario, filtra = atrapar. O sea,
                // retienen todo lo que es true, en este caso TRUE es todo lo que NO es igual al id que 
                // queremos borrar).
                proyecto: null,
                // proyecto activo debe volver a null para que no quede anda activo.
            }

        case ELIMINAR_PROYECTO_ERROR:
            return {
                ...state,
                eliminarProyectoError: true
            }

        case CANCELAR_ELIMINAR_PROYECTO_ERROR:
            return {
                ...state,
                eliminarProyectoError: false
            }

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}