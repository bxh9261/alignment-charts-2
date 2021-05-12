const models = require('../models');

const { Chart } = models;

const savedPage = (req, res) => {
  Chart.ChartModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('saved', { characters: docs });
  });
};

//create a new Chart with up to 9 imageLinks (separated by commas)
const makeChart = (req, res) => {
  const chartData = {
    imageLinks: req.body.imageLinks,
    owner: req.session.account._id
  };

  const newChart = new Chart.ChartModel(chartData);

  const chartPromise = newChart.save();

  chartPromise.then(() => res.json({ redirect: '/saved-charts' }));

  chartPromise.catch((err) => {
    console.log(err);
    return res.status(400).json({ error: 'An error occured!' });
  });
  return chartPromise;
};

//get all charts associated with the user
const getCharts = (request, response) => {
  const req = request;
  const res = response;

  return Chart.ChartModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ charts: docs });
  });
};

module.exports.getCharts = getCharts;
module.exports.savedPage = savedPage;
module.exports.make = makeChart;
