import { actualizarCountry, crearPais, eliminarPaisPorId, obtenerPaisPorId, obtenerTodosLosPaises } from "../services/paisesService.mjs";
import { validationResult } from 'express-validator';

const COUNTRIES_API = 'https://restcountries.com/v3.1/all';

export async function guardarPaises(req, res) {
    const paises = [];
    try {
        const response = await fetch(COUNTRIES_API);
        const data = await response.json();

        // Filtramos los paises que hablan español
        const paisesConEspanol = data.filter(pais => pais?.languages?.spa);

        // Creamos un array de promesas para insertar los paises
        const promesas = paisesConEspanol.map(async pais => {
            pais.creador = 'Pablo Marello'; // Agregamos el creador
            await crearPais(pais); // Guardamos el pais en la base de datos
            paises.push(pais); // Añadimos el pais al array para la respuesta
        });

        // Esperamos a que todas las inserciones se completen
        await Promise.all(promesas);

        // Respondemos después de haber guardado todos los paises
        res.status(200).json({ data: paises, mensaje: 'Paises guardados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los paises' });
    }
}

export async function obtenerTodosLosPaisesController(req, res) {
    try {
      // Obtener todos los paises de la base de datos
      const paises = await obtenerTodosLosPaises();
      // Filtrar paises por creador y que contengan un nombre
      const paisesFiltrados = paises.filter(pais => pais.creador === 'Pablo Marello' && pais.name.official);
      // Población total
      const poblacionTotal = paisesFiltrados.reduce((acc, pais) => acc + pais.population, 0);
      // Área total
      const areaTotal = paisesFiltrados.reduce((acc, pais) => acc + pais.area, 0);
      // Gini promedio
      const giniPromedio = paisesFiltrados.reduce(
          (acc, pais) => acc + (pais?.gini[2019] ? pais?.gini[2019] : 0), 0
      ) / paisesFiltrados.length;
      
      /* res.status(200).json({
        paises: paisesFiltrados,
        poblacion_total: poblacionTotal,
        area_total: areaTotal,
        gini_promedio: giniPromedio,
      }); */
      
      // Renderizar la vista 'dashboard' y pasarle los datos de los paises
      res.render('dashboardPaises', { 
        title: 'Dashboard de Paises',
        paises: paisesFiltrados,
        poblacion_total: poblacionTotal,
        area_total: areaTotal,
        gini_promedio: giniPromedio,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los paises');
    }
  }

  export function FormularioPaisController(req, res) {
    res.render('addCountry', {
      title: 'Crear Pais',
    });
  }

  export async function formularioActualizarCountryController(req, res) {
    try {
      const country = await obtenerPaisPorId(req.params.id);
      if (!country) return res.status(404).send('País no encontrado');
      res.render('editCountry', {
        title: 'Editar país',
        country
      });
    } catch (err) {
      console.log(err);
      res.statuts(500).send('Error al obtener el país');
    }
  }

  export async function actualizarCountryFormController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { id } = req.params;
    let pais = {...req.body, name: {official: req.body.officialName}, gini: {2019: req.body.gini}};
    const result = await actualizarCountry(id, pais);
      if(result?.error) {
          res.status(400).json({ mensaje: 'No se pudo actualizar el país', error: result.error });
          return;
      }
    res.redirect('/api/pais/ver-todos-los-paises');
  }

  export async function crearPaisController(req, res) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errores: errors.array() });
        }
    
        let nuevoPais = {...req.body, name: {official: req.body.officialName}, gini: {2019: req.body.gini}};
        nuevoPais.creador = 'Pablo Marello';
        const paisCreado = await crearPais(nuevoPais);
      
        if (paisCreado.error) {
          res.status(400).send({ mensaje: 'Error al crear el pais', error: paisCreado.error });
        } else {
          /* res.status(201).send(paisCreado); */
          res.redirect('/api/pais/ver-todos-los-paises');
        }
  }

  export async function borrarCountryPorIdController(req, res) {
    const {id} = req.params;
    const result = await eliminarPaisPorId(id);
      if(result?.error){
        res.status(400).json({mensaje: 'No se pudo eliminar el país', error: result.error });
        return;
      }
      /* res.status(200).json({
        data: result,
        mensaje: 'País eliminado exitosamente'
      }); */
    res.redirect('/api/pais/ver-todos-los-paises');
  }
  