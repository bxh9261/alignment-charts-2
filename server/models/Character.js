const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let CharacterModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (charname) => _.escape(charname).trim();
const setMedia = (media) => _.escape(media).trim();
const setImgLink = (imageLink) => _.escape(imageLink).trim();

const CharacterSchema = new mongoose.Schema({
  media: {
    type: String,
    required: true,
    trim: true,
    set: setMedia,
  },

  charname: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  imageLink: {
    type: String,
    required: true,
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

CharacterSchema.statics.toAPI = (doc) => ({
  charname: doc.charname,
  media: doc.media,
  imageLink: doc.imageLink,
});

CharacterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return CharacterModel.find(search).select('charname media imageLink').lean().exec(callback);
};

CharacterSchema.statics.findAllPublic = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return CharacterModel.find(search).select('charname media imageLink').lean().exec(callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;
