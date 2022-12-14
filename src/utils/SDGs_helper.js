export function getSDGIdsFromTypology(typology = 'Street Trees') {
  // function to get the SDGs from the typology
  switch (typology) {
    case 'park':
      return [11, 8, 13];
    case 'individual_street_trees':
      return [11, 8, 12, 13];
    case 'forest':
      return [11, 8, 13];
    default:
      return [];
  }
}

import sdgs8 from '../images/sdgs_8.png';
import sdgs11 from '../images/sdgs_3.png';
import sdgs12 from '../images/sdgs_12.png';
import sdgs13 from '../images/sdgs_4.png';

export function getSDGDetailsFromId(SDGNumber) {
  // function to get the SDG details from the SDG ID
  if (SDGNumber == undefined) {
    return undefined;
  } else if (typeof SDGNumber === 'string') {
    SDGNumber = parseInt(SDGNumber);
  }

  switch (SDGNumber) {
    case 11:
      return {
        number: 11,
        name: 'Sustainable Cities and Communities',
        description: 'WIP',
        image: sdgs11,
      };
    case 8:
      return {
        number: 8,
        name: 'Decent Work and Economic Growth',
        description: 'WIP',
        image: sdgs8,
      };
    case 12:
      return {
        number: 12,
        name: 'Responsible Consumption and Production',
        description: 'WIP',
        image: sdgs12,
      };
    case 13:
      return {
        number: 13,
        name: 'Climate Action',
        description: 'WIP',
        image: sdgs13,
      };
  }
}
