const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let ChartModel = {};

const convertId = mongoose.Types.ObjectId;
const setImgLink = (imageLinks) => _.escape(imageLinks).trim();

const ChartSchema = new mongoose.Schema({
  imageLinks: {
    type: String,
    trim: true,
    set: setImgLink,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },

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
module.exports.ChartSchema = ChartSchema;
