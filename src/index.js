// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/get-characters': jsonHandler.getCharacterResponse,
  '/get-all-characters': jsonHandler.getAllCharacterResponse,
  '/default-styles.css': htmlHandler.getCSSResponse,
  '/alignment-charts.gif': htmlHandler.getGifImageResponse,
  '/app': htmlHandler.getMainAppResponse,
  '/suggest': htmlHandler.getSuggestResponse,
  '/admin': htmlHandler.getAdminResponse,
  '/': htmlHandler.getMainResponse,
  notFound: htmlHandler.get404Response,
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/add-character') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // name=tony&age=35

      const bodyParams = query.parse(bodyString); // turn into an object with .name & .age
      jsonHandler.addCharacter(request, response, bodyParams);
    });
  }

  if (parsedUrl.pathname === '/remove-character') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // name=tony&age=35

      const bodyParams = query.parse(bodyString); // turn into an object with .name & .age
      jsonHandler.removeCharacter(request, response, bodyParams);
    });
  }
};

// this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);

  const httpMethod = request.method;

  if (request.method === 'POST') {
    // handle POST
    handlePost(request, response, parsedUrl);
    return; // bail out of function
  }

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
  } else {
    urlStruct.notFound(request, response);
  }
};

// create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
