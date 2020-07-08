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

export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
            }

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [...state.tareasproyecto, action.payload],
                errorTarea: false
            }

        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }

        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
                //reemplaza la tarea completa de mismo tareaId mientras que  también hace pasar al resto
                // de las tareas sin afectarlas
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }

        case CANCELAR_AGREGAR_TAREA:
        case CANCELAR_ACTUALIZAR_TAREA:
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null,
                errorTarea: false
            }

        default:
            return state;
    }
}