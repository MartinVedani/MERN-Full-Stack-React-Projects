import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// key={proyecto.proyectoId} se mueve dentro de <CSSTransition> porque es el PRIMER hijo de la iteración .map
// y React asi lo requiere

const ListadoProyectos = () => {

    // Extraer proyectos del state inicial
    const proyectosContext = useContext(ProyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    // Extraer alertas del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        // Si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();

        // eslint-disable-next-line
    }, [mensaje]);

    // Revisar si proyectos tiene contenido
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (

        <ul className='listado-proyectos'>

            {alerta ? (
                <div className={`alerta ${alerta.categoria}`}>
                    {alerta.msg}
                </div>
            ) : null}

            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames='proyecto'
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>

    );
}

export default ListadoProyectos;