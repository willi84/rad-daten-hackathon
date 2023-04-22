import {asyncForEach} from './../_shared/tools/tools';
import { getFinalData } from './data/finalData';
import {getBicycleStreets} from './endpoints/api.hamburg/api.hamburg';
import { getNearestStreet, getStreetsWithinBounds } from './getStreet/getStreet';

// get nearest street
// const coord = [10.123205999999517, 53.586292999981744];
// getNearestStreet(coord)
//   .then((streetName) => console.log(`The nearest street is: ${streetName}`))
//   .catch((error) => console.error(error));

// Daten von api.hamburg holen
// getBicycleStreets();

// Daten auswählen
getFinalData();
