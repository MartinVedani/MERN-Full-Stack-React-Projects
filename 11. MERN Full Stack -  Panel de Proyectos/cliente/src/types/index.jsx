// Types sirve para definir acciones que luego se utilizan para ver y entender la historia de lo que
// va o fue ocurriendo al utilizar la aplicación, por ejemplo ver login de usuarios y también ver si el login fue
// correcto o incorrecto. Y, dependiendo de estas acciones, luego también puedes ir ejecutando o no ciertas 
// partes del código.

// Siempre se recomienda usar 2 (dos) palabras en mayúsculas.

// Este archivo se llama index para no tener que poner el nombre del archivo cada vez que lo importamos en
// un componente.

// El flujo de codificación es: 

// 1) TYPE (este archivo) -> 
//      2) STATE (dispatch + Provider al state global) -> 
//          3)REDUCER (case type) -> 
//              4) Implementación en componente !!

// Types para context/proyectos/...
export const FORMULARIO_PROYECTO = 'FORMULARIO_PROYECTO';
export const OBTENER_PROYECTOS = 'OBTENER_PROYECTOS';
export const AGREGAR_PROYECTO = 'AGREGAR_PROYECTO';
export const VALIDAR_FORMULARIO = 'VALIDAR_FORMULARIO';
export const CANCELAR_FORMULARIO = 'CANCELAR_FORMULARIO';
export const PROYECTO_ACTUAL = 'PROYECTO_ACTUAL';
export const ELIMINAR_PROYECTO = 'ELIMINAR_PROYECTO';
export const PROYECTO_ERROR = 'PROYECTO_ERROR';

// Types para context/tareas/...
export const TAREAS_PROYECTO = 'TAREAS_PROYECTO';
export const AGREGAR_TAREA = 'AGREGAR_TAREA';
export const CANCELAR_AGREGAR_TAREA = 'CANCELAR_AGREGAR_TAREA';
export const VALIDAR_TAREA = 'VALIDAR_TAREA';
export const ELIMINAR_TAREA = 'ELIMINAR_TAREA';
export const TAREA_ACTUAL = 'TAREA_ACTUAL';
export const ACTUALIZAR_TAREA = 'ACTUALIZAR_TAREA';
export const CANCELAR_ACTUALIZAR_TAREA = 'CANCELAR_ACTUALIZAR_TAREA';
export const LIMPIAR_TAREA = 'LIMPIAR_TAREA';

// Types para context/alertas/...
export const MOSTRAR_ALERTA = 'MOSTRAR_ALERTA';
export const OCULTAR_ALERTA = 'OCULTAR_ALERTA';

// Types para context/autenticacion/...
export const REGISTRO_EXITOSO = 'REGISTRO_EXITOSO';
export const REGISTRO_ERROR = 'REGISTRO_ERROR';
export const OBTENER_USUARIO = 'OBTENER_USUARIO';
export const LOGIN_EXITOSO = 'LOGIN_EXITOSO';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CERRAR_SESION = 'CERRAR_SESION';


