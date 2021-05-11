const models = require('../models');

const { Character } = models;

const makerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('app', { characters: docs });
  });
};

const publicPage = (req, res) => {
  Character.CharacterModel.findAllPublic(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('public', { characters: docs });
  });
};

const chartsPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('charts', { characters: docs });
  });
};

const makeCharacter = (req, res) => {
  if (!req.body.charname || !req.body.media || !req.body.imageLink) {
    console.log(req.body.charname + req.body.media + req.body.imageLink);
    return res.status(400).json({ error: 'RAWR! All fields are required!' });
  }

  const characterData = {
    charname: req.body.charname,
    media: req.body.media,
    imageLink: req.body.imageLink,
    owner: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(characterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/maker' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character already exists.' });
    }
    return res.status(400).json({ error: 'An error occured!' });
  });
  return characterPromise;
};

const getCharacters = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ characters: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getCharacters = getCharacters;
module.exports.make = makeCharacter;
module.exports.publicPage = publicPage;
module.exports.chartsPage = chartsPage;
