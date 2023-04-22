// Winterdienst HPA
// https://api.hamburg.de/datasets/v1/winterdienst_radverkehr_hpa/collections/winterdienst_achsen_hpa/items?bulk=true&f=json

// Winterdienst SRH
// https://api.hamburg.de/datasets/v1/winterdienst_radverkehr_srh/collections/radwege/items?f=json


// https://api.hamburg.de/datasets/v1/gefahrgutstrassen/collections/gefahrgutstrassen/items?bulk=true&f=json

// https://api.hamburg.de/datasets/v1/stadtrad/collections/stadtrad_stationen/items?bulk=true&f=json

// https://api.hamburg.de/datasets/v1/fahrradluftstationen/collections/fahrradluftstationen/items?bulk=true&f=json
export const ENDPOINTS = {
  'fahrradluftstationen': [
    {'name': 'fahrradluftstationen', 'api': 'fahrradluftstationen',
    'street': 'name'},
  ],
  'stadtrad': [
    {'name': 'stadtrad_stationen', 'api': 'stadtrad_stationen',
    'street': 'name'},
  ],
  'gefahrgutstrassen': [
    'gefahrgutstrassen',
  ],
  'winterdienst_radverkehr_hpa': [
    {'name': 'winterdienst_radverkehr_hpa', 'api': 'winterdienst_achsen_hpa'},
  ],
  'winterdienst_radverkehr_srh': [
    {'name': 'winterdienst_radverkehr_srh', 'api': 'radwege'},
  ],
  'radverkehrsnetz': [
    'radwege_mischverkehr',
    'radwege_sonstige',
    'radwege_gruenflaechen',
    'radwege_streifen',
    'radwege_radweg',
    'radwege_schiebestrecke',
    'radwege_fahrradstrasse',
  ],
};
