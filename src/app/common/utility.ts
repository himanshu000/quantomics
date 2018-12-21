import { Metabolite } from '../models/metabolite';

export class Utility {
  convertJSONToArray(data: Metabolite) {
    const parsedArray = [];
    for (const metabolite in data) {
      if (data.hasOwnProperty(metabolite)) {
        const value = data[metabolite];
        value.forEach(element => {
          parsedArray.push({
            metabolite,
            area_1: element.area_1,
            area_2: element.area_2,
            average_area: (element.area_1 + element.area_2) / 2
          });
        });
      }
    }
    return parsedArray;
  }
}
