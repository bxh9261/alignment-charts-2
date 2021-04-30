const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getCharacters', mid.requiresLogin, controllers.Character.getCharacters);
  app.get('/getPublicCharacters', mid.requiresLogin, controllers.Character.getPublicCharacters);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Character.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Character.make);
  app.get('/public', mid.requiresLogin, controllers.Character.publicPage);
  app.get('/chart-maker', mid.requiresLogin, controllers.Character.chartsPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
