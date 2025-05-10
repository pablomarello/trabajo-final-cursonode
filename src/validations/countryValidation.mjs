import { body } from 'express-validator';

const countryValidations = [
    body('officialName')
        .trim().not().isEmpty().withMessage('El nombre del pais es requerido')
        .isLength({ min:3 }).withMessage('El nombre debe tener como mínimo 3 caracteres')
        .isLength({ max:90 }).withMessage('El nombre debe tener como máximo 90 caracteres'),
    body('capital')
        .trim().not().isEmpty().withMessage('La capital es requerida')
        .isLength({ min: 3 }).withMessage('La capital debe tener al menos 3 caracteres')
        .isLength({ max: 90 }).withMessage('La capital debe tener un máximo de 90 caracteres'),
    body('borders')
        .customSanitizer((value) => {
        if (typeof value === 'string') {
            return value.split(',').map((item) => item.trim()); // Convertir el string a array
        }
    return value;
    })
    .isArray().withMessage('El campo fronteras debe ser un array')
    .not().isEmpty().withMessage('El campo fronteras no puede estar vacío')
    .custom((value) => {
    // Validar que cada elemento del array sea un string sin espacios en blanco
    if (!Array.isArray(value)) return false;
    for (const border of value) {
        if (typeof border !== 'string' || !border.trim() || border.length != 3 || border !== border.toUpperCase()) {
        return false;
        }
    }
    return true;
    }).withMessage('Cada frontera debe ser una cadena de texto de 3 caracteres en mayúscula y sin espacios.'),
    body('area')
        .trim().not().isEmpty().withMessage('El área es requerida')
        .isNumeric().withMessage('El área debe ser numérica'),
    body('population')
        .trim().not().isEmpty().withMessage('La población es requerida')
        .isNumeric().withMessage('La población debe ser numérica')
        .isInt({ min: 0 }).withMessage('La población debe ser un número entero no negativo'),
    body('gini')
        .trim().not().isEmpty().withMessage('El gini es requerido')
        .isNumeric().withMessage('El gini debe ser numérico')
        .isInt({ min: 0, max: 100 }).withMessage('El gini debe ser un número entero no negativo entre 0 y 100'),
]

export default countryValidations;