const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let ChartModel = {};

const convertId = mongoose.Types.ObjectId;

const ChartSchema = new mongoose.Schema({
  imageLinks: [{
    type: String,
    trim: true,
  }],

});

ChartSchema.statics.toAPI = (doc) => ({
  imageLinks: doc.imageLinks,
});

ChartSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return ChartModel.find(search).select('imageLinks').lean().exec(callback);
};

// ChartSchema.statics.findAllPublic = (ownerId, callback) => {
//   const search = {
//     owner: convertId(ownerId),
//   };
//   return CharacterModel.find(search).select('charname media imageLink').lean().exec(callback);
// };

ChartModel = mongoose.model('Chart', ChartSchema);

module.exports.ChartModel = ChartModel;
module.exports.CharatSchema = ChartSchema;
