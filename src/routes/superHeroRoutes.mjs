import express from 'express';
import { body } from 'express-validator';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  crearSuperheroeController,
  actualizarSuperheroeController,
  borrarSuperheroePorIdController,
  borrarSuperheroePorNombreController,
  formularioSuperheroeController,
  formularioActualizarSuperheroeController,
  actualizarSuperheroeFormController,
  eliminarSuperheroeController
} from '../controllers/superheroesController.mjs';
import superheroValidations from '../validations/superheroValidation.mjs';
import { FormularioPaisController, guardarPaises, obtenerTodosLosPaisesController, crearPaisController, formularioActualizarCountryController, actualizarCountryFormController, borrarCountryPorIdController } from '../controllers/paisesController.mjs';
import countryValidations from '../validations/countryValidation.mjs';

const router = express.Router();

router.get('/guardar-paises', guardarPaises);
router.get('/pais/ver-todos-los-paises', obtenerTodosLosPaisesController);
router.get('/pais/crear', FormularioPaisController);
router.post('/pais/crear', countryValidations, crearPaisController);
router.get('/pais/editar/:id', formularioActualizarCountryController);
router.post('/pais/editar/:id', countryValidations, actualizarCountryFormController);
router.get('/pais/eliminar/:id', borrarCountryPorIdController);
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/crear', formularioSuperheroeController);
router.post('/heroes', superheroValidations, crearSuperheroeController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/editar/:id', formularioActualizarSuperheroeController);
router.post('/heroes/editar/:id', superheroValidations, actualizarSuperheroeFormController);
router.patch('/heroes/:id', superheroValidations, actualizarSuperheroeController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/eliminar/:id', eliminarSuperheroeController);
router.delete('/heroes/:id', borrarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', borrarSuperheroePorNombreController);

export default router;