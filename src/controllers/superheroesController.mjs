import { validationResult } from 'express-validator';
import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearSuperHeroe, 
  actualizarSuperHeroe, eliminarSuperheroePorId,
  eliminarSuperheroePorNombre}
  from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes }
  from '../views/responseView.mjs';

  export async function formularioActualizarSuperheroeController(req, res) {
    try {
      const hero = await obtenerSuperheroePorId(req.params.id);
      if (!hero) return res.status(404).send('Superhéroe no encontrado');
      res.render('editSuperhero', {
        title: 'Editar superhéroe',
        hero
      });
    } catch (err) {
      console.log(err);
      res.statuts(500).send('Error al obtener el superhéroe');
    }
  }

  export async function formularioSuperheroeController(req, res) {
    res.render('addSuperhero', {
      title: 'Crear superhéroe',
    });
  }

  export async function actualizarSuperheroeFormController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { id } = req.params;
    const superheroe = req.body;
    const result = await actualizarSuperHeroe(id, superheroe);
    if(result?.error) {
      res.status(400).json({ mensaje: 'No se pudo actualizar el superheroe', error: result.error });
      return;
    }
    res.redirect('/api/heroes');
  }

  export async function crearSuperheroeController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const nuevoSuperheroe = req.body;
    const superheroeCreado = await crearSuperHeroe(nuevoSuperheroe);
  
    if (superheroeCreado.error) {
      res.status(400).send({ mensaje: 'Error al crear el superhéroe', error: superheroeCreado.error });
    } else {
      res.status(201).send(renderizarSuperheroe(superheroeCreado));
    }
  }

export async function actualizarSuperheroeController(req, res) {
  const {id} = req.params;
  const superheroe = req.body;
  const result = await actualizarSuperHeroe(id, superheroe);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo actualizar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe actualizado exitosamente'
  });
}

export async function borrarSuperheroePorIdController(req, res) {
  const {id} = req.params;
  const result = await eliminarSuperheroePorId(id);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo eliminar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe eliminado exitosamente'
  });
}

export async function borrarSuperheroePorNombreController(req, res){
  const {nombre} = req.params;
  const result = await eliminarSuperheroePorNombre(nombre);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo eliminar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe eliminado exitosamente'
  });
}

export async function obtenerSuperheroePorIdController(req, res){
  const { id } = req.params
  const superheroe = await obtenerSuperheroePorId(id);

  if(superheroe){
    res.send(renderizarSuperheroe(superheroe));
  }else{
    res.status(404).send({ mensaje: "Superhéroe no encontrado" });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res){
  try{
    const superheroes = await obtenerTodosLosSuperheroes();
    //renderizar la vista dashboard y pasarle los datos de todos los superheroes
    res.render('dashboard', {
      title: 'Superhéroes',
      heroes: superheroes
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los superhéroes');
  }
  //res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroesPorAtributoController(req, res){
  const { atributo, valor } = req.params;
  const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

  if(superheroes.length > 0){
    res.send(renderizarListaSuperheroes(superheroes));
  }else{
    res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atibuto" });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res){
  const superheroes = await obtenerSuperheroesMayoresDe30();
  res.send(renderizarListaSuperheroes(superheroes));
}

export async function eliminarSuperheroeController(req, res) {
  try{

    const result = await eliminarSuperheroePorId(req.params.id);
    if(result?.error){
      res.status(400).json({ mensaje: 'No se pudo eliminar el héroe', error: result.error});
      return;
    }
    res.redirect('/api/heroes'); // Redirige a la lista después de eliminar
  }catch (err) {
    res.status(500).send('Error al eliminar el héroe');
  }
}