const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getCharacters', mid.requiresLogin, controllers.Character.getCharacters);
  app.get('/getCharts', mid.requiresLogin, controllers.Chart.getCharts);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/password', mid.requiresSecure, mid.requiresLogout, controllers.Account.password);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Character.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Character.make);
  app.get('/public', mid.requiresLogin, controllers.Character.publicPage);
  app.get('/chart-maker', mid.requiresLogin, controllers.Character.chartsPage);
  app.get('/saved-charts', mid.requiresLogin, controllers.Chart.savedPage);
  app.post('/makeChart', mid.requiresLogin, controllers.Chart.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
