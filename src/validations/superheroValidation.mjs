import { body } from 'express-validator';

const superheroValidations = [
  body('nombreSuperHeroe')
    .trim().not().isEmpty().withMessage('El nombre del superheroe es requerido')
    .isLength({ min:3 }).withMessage('El nombre debe tener como mínimo 3 caracteres')
    .isLength({ max:60 }).withMessage('El nombre debe tener como máximo 60 caracteres'),
  body('nombreReal')
    .trim().not().isEmpty().withMessage('El nombre real del superheroe es requerido')
    .isLength({ min:3 }).withMessage('El nombre debe tener como mínimo 3 caracteres')
    .isLength({ max:60 }).withMessage('El nombre debe tener como máximo 60 caracteres'),
  body('edad')
    .trim().not().isEmpty().withMessage('La edad del superheroe es requerida')
    .isNumeric().withMessage('La edad debe ser un número')
    .isInt({ min:0 }).withMessage('La edad debe ser un número no negativo'),
  body('poderes')
    .customSanitizer((value) => {
      if(typeof value === 'string') {
        return value.split(',').map((item) => item.trim()); //convierte el string en array
      }
      return value;
    })
    .isArray().withMessage('El poderes debe ser un array')
    .not().isEmpty().withMessage('El campo poderes no puede estar vacio')
    .custom((value) => {
      //validacion que cada elemento del array sea un string sin espacios blancos
      if(!Array.isArray(value)) return false;
      for (const poder of value) {
        if(typeof poder !== 'string' || !poder.trim() || poder.length < 3 || poder.length > 60) {
          return false;
        }
      }
      return true;
    }).withMessage('Cada poder debe ser una cadena de texto que contenga entre 3 y 60 caracteres sin espacios en blanco'),


]

export default superheroValidations;