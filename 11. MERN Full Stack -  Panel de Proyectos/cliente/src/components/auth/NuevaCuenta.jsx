import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // extraer los valores del context de Alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // extraer los valores del context de autenticación
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el usuario se haya autenticado, registrado, o sea un registro duplicado
    useEffect(() => {
        if (autenticado) props.history.push('/proyectos');

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);
    //como estamos usando react router dom, tenemos acceso a props.history
    // necesitamos la linea 'eslint-disable-next-line' porque el compilador señala, erróneamente,
    // que debemos agregar mostrarAlerta como dependencia

    // state para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        email2: '',
        password: '',
        confirmar: ''
    });

    //desestructurar usuario
    const { nombre, apellido, email, email2, password, confirmar } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario, //clonamos para que lo que esta escrito en el otro campo de usuario, no se pierda
            [e.target.name]: e.target.value
        })

    };

    // cuando el usuario quiere crear nueva cuenta
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacíos
        if (nombre.trim() === '' ||
            apellido.trim() === '' ||
            email.trim() === '' ||
            email2.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === '') {

            mostrarAlerta('Todos los campos son obligatorios', 'alerta alerta-error');
            return;
        }

        // Password mínimo de 8 caracteres
        if (password.length < 8) {
            mostrarAlerta('El password debe ser de al menos 8 caracteres', ' alerta alerta-error');
            return;
        }

        // Los 2 emails son iguales
        if (email.trim() !== email2.trim()) {
            mostrarAlerta('Los emails no son iguales', ' alerta alerta-error');
            guardarUsuario({
                ...usuario,
                email: '',
                email2: '',
                password: '',
                confirmar: ''
            });
            return;
        }

        // Los 2 passwords son iguales
        if (password.trim() !== confirmar.trim()) {
            mostrarAlerta('Las passwords no son iguales', ' alerta alerta-error');
            guardarUsuario({
                ...usuario,
                password: '',
                confirmar: ''
            });
            return;
        }

        // Pasar al action
        registrarUsuario({
            nombre,
            apellido,
            email,
            password
        });
    }

    return (
        <div className='form-usuario'>

            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}

            <div className='contenedor-form sombra-dark'>
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >

                    <div className='campo-form'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id='nombre'
                            name='nombre'
                            value={nombre}
                            placeholder='Tu Primer Nombre'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            id='apellido'
                            name='apellido'
                            value={apellido}
                            placeholder='Tu Apellido'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Tu Email'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="email">Confirmar Email</label>
                        <input
                            type="email"
                            id='email2'
                            name='email2'
                            value={email2}
                            placeholder='Repite Tu Email'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Tu password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id='confirmar'
                            name='confirmar'
                            value={confirmar}
                            placeholder='Repite tu password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <input
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Registrarme'
                        />
                    </div>

                </form>

                <Link to={'/'} className='enlace-cuenta'>
                    Volver a Iniciar Sesión
                </Link>

            </div>

        </div>
    );
}

export default NuevaCuenta;