import mongoose from "mongoose";
import PaisesRepository from "../repositories/PaisesRepository.mjs";

const paisesRepository = new PaisesRepository();

export async function crearPais(pais) {
    try {
      const newPais = await paisesRepository.crear(pais);
      return newPais
    } catch (error) {
      return {
        error: JSON.stringify(error)
      }
    }
  }
  
export async function obtenerTodosLosPaises() {
    return await paisesRepository.obtenerTodos();
  }

export async function obtenerPaisPorId(id) {
    return await paisesRepository.obtenerPorId(id);
  }

export async function actualizarCountry(id, pais) {
  try {
    let country = await paisesRepository.actualizar(id, pais);
    const result = {...country.toJSON(), ...pais}
    return result
  } catch (error){
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function eliminarPaisPorId(id) {
try {
    return await paisesRepository.deleteById(id);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}