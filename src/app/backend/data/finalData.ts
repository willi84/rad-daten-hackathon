import { fileExists, readFile, writeFileSync } from './../../_shared/fs/fs';
import { LOG, OK } from './../../_shared/log/log';
import { ENDPOINTS } from '../endpoints/api.hamburg/config';


const handleData = (DATA: any, street: string, name: string) => {
  if (!DATA.hasOwnProperty(street)) {
    DATA[street] = {
      'categories': [],
      // 'oberflaeche'
    };
  }
  if (DATA[street]['categories'].indexOf(name) === -1) {
    DATA[street]['categories'].push(name);
  }
};
export const getFinalData = () => {
  const DATA = {};
  const endpoints = Object.keys(ENDPOINTS);
  for (const endpoint of endpoints) {
    const types = ENDPOINTS[endpoint];
    for (const type of types) {
      const hasOtherName = typeof type === 'string';
      const key = hasOtherName ? type : type['api'];
      const name = hasOtherName ? type : type['name'];
      const BASE = `tmp/${name}`;
      const FILES = [
        `${BASE}.json`,
        `${BASE}_streets_unique.json`,
        `${BASE}_streets_all.json`,
      ];
      const file = `${BASE}_streets_all.json`;
      if (fileExists(file)) {
        const content = readFile(file).toString();
        const data = JSON.parse(content);
        const streets = data.streets;
        streets.forEach((street: string) => {
          if (street) {
            if (street.indexOf('/') !== -1) {
              const _streets = street.split('/');
              _streets.forEach((_street: string) => {
                const s = _street.trim();
                handleData(DATA, s, name);
              });
            } else {
              handleData(DATA, street, name);
            }
          }
        });
      }
      const file2 = `${BASE}.json`;
      if (fileExists(file2)) {
        const content = readFile(file2).toString();
        const data = JSON.parse(content);
        // if (data.features) {
        //   LOG(OK, `has features ${data.features.length}` )
        // }
        const features = data.features;
        features.forEach((feature: any) => {
          if(feature.properties && feature.properties.oberflaeche){
            const street = feature.properties.strasse || feature.properties.strassenname;
            if(feature.properties.oberflaeche !== undefined){
              const feat = feature.properties.oberflaeche
              handleData(DATA, street, feat);

            }
            // handleData(DATA, street, name);
          }
        });
      }
    }
  }
  writeFileSync('src/app/dashboard/assets/data.json', JSON.stringify(DATA));
}