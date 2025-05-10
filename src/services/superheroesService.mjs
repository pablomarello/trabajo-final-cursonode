import moongose from "mongoose";
import superHeroRepository from '../repositories/SuperHeroRepository.mjs';


export async function crearSuperHeroe(superheroe) {
  try {
    const superhero = await superHeroRepository.crear(superheroe);
    return superhero;
  } catch (error) {
    return {
      error: JSON.stringify(error),
    };
  }
}

export async function actualizarSuperHeroe(id, superheroe) {
  try {
    let hero = await superHeroRepository.actualizar(id, superheroe);
    const result = {...hero.toJSON(), ...superheroe}
    return result
  } catch (error){
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function eliminarSuperheroePorId(id) {
  try {
    return await superHeroRepository.borrarPorId(id);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function eliminarSuperheroePorNombre(nombre) {
  try{
    return await superHeroRepository.borrarPorNombre(nombre);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function obtenerSuperheroePorId(id){
  return await superHeroRepository.obtenerId(id);
}

export async function obtenerTodosLosSuperheroes(){
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor){
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30(){
  return await superHeroRepository.obtenerMayoresDe30();
}