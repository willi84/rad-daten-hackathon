
// API Key als environemnt
const KEY = process.env.API_OPEN_ROUTESERVICE;
const request = require('request');

const types = [
  'application/json',
  'application/geo+json',
  'application/gpx+xml',
  'img/png; charset=utf-8',
];
const options = {
  method: 'GET',
  url: 'https://api.openrouteservice.org/v2/directions/driving-car',
  qs: {
    api_key: KEY,
    start: '8.681495,49.41461',
    end: '8.687872,49.420318',
  },
  headers: {
    'Accept': types.join(', '),
  },
};

export const getRoute = () => {
  request(options, (error, response, body) => {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
  });
};

