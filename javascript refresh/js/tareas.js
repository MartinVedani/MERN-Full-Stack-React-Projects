// no hace falta linkear este archivo con el HTML
// <script src="js/tareas.js"></script>

// exportar una variable
const tareaNombre = 'Evitar a la suegra';
const resultado = 'no siempre ayuda'

// solo se puede tener un export default por dpocumento, una variable, una clase, o un objeto con
// multiples elementos

export default {
    accion: tareaNombre,
    resultado: resultado,
}

export const nombreTarea = 'Pasear al perro';

// Exportar una función
export const crearTarea = (tarea, urgencia) => {
    return `La tarea ${tarea} tiene una urgencia ${urgencia}`
}

export const tareaCompleta = () => {
    console.log('La tarea se completó');
}

export class Tarea_Exportada {
    constructor(nombre, prioridad) {
        this.nombre = nombre;
        this.prioridad = prioridad;
    }

    //metodo, una funcion dentro de una clase
    mostrar() {
        console.log(`${this.nombre} tiene una prioridad ${this.prioridad}`);
    }
}