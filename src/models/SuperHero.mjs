import moongose from 'mongoose';

const superheroSchema = new moongose.Schema({
 
  nombreSuperHeroe: { type: String, required: true },
  nombreReal: { type: String, required: true },
  edad: { type: Number, min: 0 },
  planetaOrigen: { type: String, default: 'Desconocido' },
  debilidad: String,
  poderes: [String],
  aliados: [String],
  enemigos: [String],
  createdAt: { type: Date, default: Date.now }
}, {collection:'Grupo-17'});

export default moongose.model('SuperHero', superheroSchema);