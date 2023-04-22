import { DEBUG } from './../../../_shared/log/log';
import {ENDPOINTS} from './config';
import {fileExists, writeFileSync} from '../../../_shared/fs/fs';
import {LOG, OK} from '../../../_shared/log/log';
import {getNearestStreet} from './../../getStreet/getStreet';

const https = require('https');


export const getBicycleStreets = async (): Promise<void> => {
  const start = Date.now();
  const endpoints = Object.keys(ENDPOINTS);
  for (const endpoint of endpoints) {
    const collection = `/datasets/v1/${endpoint}/collections`;
    const types = ENDPOINTS[endpoint];
    for (const type of types) {
      const hasOtherName = typeof type === 'string';
      const key = hasOtherName ? type : type['api'];
      const name = hasOtherName ? type : type['name'];
      console.log(name);
      const url = `${collection}/${key}/items?f=json&bulk=true`;
      console.log(url);
      const options = {
        hostname: 'api.hamburg.de',
        path: `${url}`,
        method: 'GET',
      };
      const BASE = `tmp/${type}`;
      const FILES = [
        `${BASE}.json`,
        `${BASE}_streets_unique.txt`,
        `${BASE}_streets_all.txt`,
      ];
      let hasFiles = false;
      FILES.forEach((FILE: string) => {
        if (fileExists(FILE)) {
          hasFiles = true;
        }
      });
      if (!hasFiles) {
        const response = await new Promise<string>((resolve, reject) => {
          https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              resolve(data);
            });
          }).on('error', (err) => {
            reject(err);
          });
        });
        const items = JSON.parse(response).features;
        const streets = [];
        if (items) {
          items.forEach((item: any) => {
            const properties = item.properties;
            if (properties && type.street) {
              const street = properties[type.street];
              streets.push(street);
            } else {
              const street = properties.strassenname || properties.strasse;
              streets.push(street);
            }
          });
        }
        const uniqueList = Array.from(new Set(streets));
        const resultUniqueList = {'streets': [...uniqueList]};
        const resultStreetList = {'streets': [...streets]};
        writeFileSync(`tmp/${name}.json`, JSON.stringify(JSON.parse(response)));
        writeFileSync(`tmp/${name}_streets_unique.json`,  JSON.stringify(JSON.parse(JSON.stringify(resultUniqueList))));
        writeFileSync(`tmp/${name}_streets_all.json`, JSON.stringify(JSON.parse(JSON.stringify(resultStreetList))));
      } else {
        LOG(OK, `files for ${BASE} already exists` );
      }
      LOG(OK, `data received for ${type} after ${(Date.now() - start) / 1000}ms`);
    }
  }
};


