import Country from "../models/Country.mjs";
import IRepository from "./IRepository.mjs";

class PaisesRepository extends IRepository {

  async crear(pais) {
    return await Country.create(pais);
  }

  async actualizar(id, pais) {
    return await Country.findByIdAndUpdate(id, pais);
  }

  async deleteById(id) {
    return await Country.findByIdAndDelete(id);
  }

  async deleteByName(nombre) {
    return await Country.findOneAndDelete({ 'name.official': nombre });
  }

  async obtenerPorId(id) {
    return await Country.findById(id);
  }

  async obtenerTodos() {
    return await Country.find({});
  }
}

export default PaisesRepository;