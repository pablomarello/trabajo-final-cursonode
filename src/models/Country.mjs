import moongose from 'mongoose';

const countrySchema = new moongose.Schema({
    id: String,
    name: {
      common: { type: String },
      official: { type: String },
      nativeName: {
          grn: {
              official: { type: String },
              common: { type: String }
          },
          spa: {
              official: { type: String },
              common: { type: String }
          }
      }
    },
    independent: { Type: Boolean },
    status: { type: String },
    unMember: { type: Boolean },
    currencies: {
      ARS: {
        name: { type: String },
        symbol: { type: String }
      }
    },
    capital: { type: Array },
    region: { type: String },
    subregion: { type: String },
    languages: {
      grn: { type: String },
      spa: { type: String }
    },
    latlng: { type: Array },
    landlocked: { type: Boolean, default: false },
    borders: { type: Array, default: [] },
    area: { type: Number },
    flag: { type: String },
    maps: {
      googleMaps: { type: String },
      openStreetMaps: { type: String }
    },
    population: { type: Number },
    gini: {
      2019: { type: Number }
    },
    fifa: { type: String },
    timezones: { type: Array },
    continents: { type: Array },
    flags: { type: Array },
    startOfWeek: { type: String },
    capitalInfo: {
      latlng: { type: Array },
    },
    creador: { type: String },
  }, { collection: 'Grupo-17' });

export default moongose.model('Country', countrySchema);