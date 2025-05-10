import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository{

  async crear(superheroe) {
    const nuevoSuperheroe = new SuperHero(superheroe);
    return await nuevoSuperheroe.save();
  }

  async actualizar(id, superheroe) {
    return await SuperHero.findByIdAndUpdate(id, superheroe);
  }

  async borrarPorId(id) {
    return await SuperHero.findByIdAndDelete(id);
  }

  async borrarPorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre});
  }

  async obtenerId(id){
    return await SuperHero.findById(id);
  }

  async obtenerTodos(){
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor){
    const query = { [atributo]: new RegExp(valor, 'i') };
    return await SuperHero.find(query);
  }

  async obtenerMayoresDe30(){
    return await SuperHero.find({ edad: { $gt: 30 }, planetaOrigen: 'Tierra',
    poderes: { $size: { $gt: 2 } } });
  }
}

export default new SuperHeroRepository();