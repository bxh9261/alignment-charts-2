const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const aquaStyle = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const mainPage = fs.readFileSync(`${__dirname}/../client/main-app.html`);
const suggestPage = fs.readFileSync(`${__dirname}/../client/suggest-page.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);
const slashMainPage = fs.readFileSync(`${__dirname}/../client/main-page.html`);
const previewImage = fs.readFileSync(`${__dirname}/../client/alignment-charts.gif`);

const get404Response = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(aquaStyle);
  response.end();
};

const getMainAppResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(mainPage);
  response.end();
};

const getSuggestResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(suggestPage);
  response.end();
};

const getAdminResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(adminPage);
  response.end();
};

const getMainResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(slashMainPage);
  response.end();
};

const getGifImageResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/gif' });
  response.write(previewImage);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getCSSResponse = getCSSResponse;
module.exports.getMainAppResponse = getMainAppResponse;
module.exports.getSuggestResponse = getSuggestResponse;
module.exports.getAdminResponse = getAdminResponse;
module.exports.getMainResponse = getMainResponse;
module.exports.getGifImageResponse = getGifImageResponse;
