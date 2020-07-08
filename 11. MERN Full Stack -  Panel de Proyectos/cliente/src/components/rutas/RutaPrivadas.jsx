import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

// Si no hay un usuario autenticado, vamos a proteger el proyecto enviando al usuario
// de regreso a la pagina principal de login.

// Para esto, creamos un higher order component (Un componente que toma otro componente dentro de sí mismo junto con la copia
// de los props que podrán ser utilizados por el componente hijo).
const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    // El redireccionamiento solo ocurrirá cuando no haya un usuario autenticado Y cuando cargando = false.
    // De esta forma evitamos el flash de la pagina de login al recargar la pagina principal DENTRO de la
    // aplicación DESPUÉS del login exitoso.

    useEffect(() => {
        usuarioAutenticado();

        // eslint-disable-next-line
    }, [])

    return (

        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to='/' />
        ) : (
                <Component {...props} />
            )}
        />

    );
}

export default RutaPrivada;