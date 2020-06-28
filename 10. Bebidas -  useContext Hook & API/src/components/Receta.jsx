import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

// npm i @material-ui/core
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    overflow: 'auto',
    height: '95%',
    display: 'block',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({ receta }) => {

  // Configuración del modal de material UI
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  // classes para Modal = classes.paper (de la línea 20)
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const { guardarIdReceta, informacion, guardarReceta } = useContext(ModalContext);

  // Muestra y formatea los ingredientes
  const mostrarIngredientes = informacion => {
    let ingredientes = [];
    for (var i = 1; i < 16; i++) {
      if (informacion[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}
          </li>
        )
      }
    }
    return ingredientes;
  }

  return (
    <div className='col-md-4 mb-3'>
      <div className='card'>
        <h2 className='card-header'>{receta.strDrink}</h2>

        <img
          className='card-img-top'
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />

        <div className='card-body'>
          <button
            type='button'
            className='btn btn-block btn-primary'
            onClick={() => {
              guardarIdReceta(receta.idDrink);
              handleOpen();
            }}
          >Ver Receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              guardarIdReceta(null);
              handleClose();
              guardarReceta({});
            }}
          >
            <div
              style={modalStyle}
              className={classes.paper}
            >
              <h2>{informacion.strDrink}</h2>
              <h3 className='my-4'>Instrucciones</h3>
              <p>
                {informacion.strInstructions}
              </p>

              <img
                className='img-fluid mt-4'
                src={informacion.strDrinkThumb}
                alt={informacion.strDrink}
              />

              <h3>Ingredientes y Cantidades</h3>
              <ul>
                {mostrarIngredientes(informacion)}
              </ul>
            </div>
          </Modal>

        </div>

      </div>
    </div>
  );
}

Receta.propTypes = {
  receta: PropTypes.object.isRequired,
}

export default Receta;
