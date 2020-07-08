// El flujo de codificación de states es: 

// TYPE (este archivo) -> STATE (dispatch + Provider al state global) -> REDUCER (case type) -> Implementación en componente

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }

        case OCULTAR_ALERTA:
            return {
                alerta: null
            }

        default:
            return state;
    }
}