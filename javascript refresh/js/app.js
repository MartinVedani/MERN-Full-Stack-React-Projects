const personas = [
    { nombre: 'Juan', edad: 23, aprendiendo: 'JavaScript' },
    { nombre: 'Pablo', edad: 18, aprendiendo: 'PHP' },
    { nombre: 'Alejandra', edad: 21, aprendiendo: 'AdobeXD' },
    { nombre: 'Caren', edad: 30, aprendiendo: 'Python' },
    { nombre: 'Miguel', edad: 35, aprendiendo: 'ReactJS' },
]

console.log(personas);

// .find() para buscar atributos deseados en objetos
let mayores = personas.filter(persona => {
    return persona.edad > 28
});

console.log(mayores);

const alejandra = personas.find(persona => {
    return persona.nombre === 'Alejandra';
});

console.log(`${alejandra.nombre} esta aprendiendo ${alejandra.aprendiendo}`);

// .reduce() for metrics
let total = personas.reduce((totalEdad, persona) => {
    return totalEdad + persona.edad
        // comienza con totalEdad = 0, y agrega la edad de cada persona
        // a medida que recorre cada objeto en el array personas.
}, false);

const promedio = total / personas.length;
console.log(total);
console.log(promedio);

//Promesas

// const aplicarDescuento = new Promise((resolve, reject) => {

//     let descuento = true;

//     if (descuento) {
//         resolve('Éxito, descuento aplicado !')
//     } else {
//         reject('False: No se permitió el descuento')
//     }

// });

// aplicarDescuento.then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error)
// });

// Promesas con AJAX
const descargarUsuarios = cantidad => new Promise((resolve, reject) => {

    // pasar la cantidad a la API
    const api = `https://randomuser.me/api/?results=${cantidad}&nat=us`;

    //ajax call
    const xhr = new XMLHttpRequest();

    //open the connection (true para asincronico)
    xhr.open('GET', api, true)

    //on load
    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).results);
        } else {
            reject(Error(xhr.statusText));
        }
    }

    //optional (on error)
    xhr.onerror = (error) => reject(error);

    //send
    xhr.send()
});

descargarUsuarios(20)
    .then(
        miembros => printHTML(miembros),
        error => console.error(
            new Error(`Algo salió mal: ${error}`)
        )
    );

function printHTML(usuarios) {
    let html = '';
    usuarios.forEach(usuario => {
        html += `
            <li>
                nombre: ${usuario.name.first} ${usuario.name.last}
                Nationality: ${usuario.nat}
                Picture:
                    <img src='${usuario.picture.medium}'>
            </li>
        `;
    });
    const containerApp = document.querySelector('#app');
    containerApp.innerHTML = html;
}

// clases in JavaScript

class Tarea {
    constructor(nombre, prioridad) {
        this.nombre = nombre;
        this.prioridad = prioridad;
    }

    //metodo, una funcion dentro de una clase
    mostrar() {
        console.log(`${this.nombre} tiene una prioridad ${this.prioridad}`);
    }
}

class ComprasPendientes extends Tarea {
    constructor(nombre, prioridad, cantidad) {
        super(nombre, prioridad); //se heredan de Tarea gracias al comando "extend"
        this.cantidad = cantidad;
    }

    //Puede heredar el método de la clase madre y extenderlo con la cantidad.
    mostrar() {
        super.mostrar();
        console.log(`y la cantidad de ${this.cantidad}`);
    }

    //Obviamente puede tener sus propios metodos

    pedir() {
        console.log(`Hola, por favor necesito ${this.cantidad} unidades de ${this.nombre}, es de prioridad ${this.prioridad}!`);
    }
}


let tarea1 = new Tarea('Aprender JavaScript', 'Alta');
let tarea2 = new Tarea('Preparar café', 'Alta');
let tarea3 = new Tarea('Pasear al perro', 'Media');
let tarea4 = new Tarea('Conocer a mis suegros', 'Baja');

tarea1.mostrar();
tarea2.mostrar();
tarea3.mostrar();
tarea4.mostrar();

// compras

let compra1 = new ComprasPendientes('Jabon', 'Urgente', 3);
compra1.mostrar();
compra1.pedir();

// IMPORTA desde el archivo tareas.JS

//hace falta agregar tyoe="module" en el link con el HTML
// <script src="js/app.js" type="module"></script>

//importando algo que sea default, no requiere llaves y se le puede cambiar el nombre pq 
// javaScript sabe a qué te refieres (solo puede haber 1 export default por archivo).
import HOLA from './tareas.js'
console.log(HOLA);
console.log(HOLA.accion);
console.log(HOLA.resultado);

// Importar FUNCIONES
// Importando sin default, requiere llaves {} y debe tener el mismo nombre con el q se lo exporta

import { nombreTarea, crearTarea, tareaCompleta } from './tareas.js'

const tarea5 = crearTarea(nombreTarea, 'media');

console.log(tarea5); // La tarea pasear al perro tiene una urgencia media.
tareaCompleta();

// Importando CLASES
import { Tarea_Exportada } from './tareas.js'

const tarea6 = new Tarea_Exportada('Aprender JavaScript', 'Urgente');
console.log(tarea6);
tarea6.mostrar();