export function getSDGIdsFromTypology(typology = 'Street Trees') {
  // function to get the SDGs from the typology
  switch (typology) {
    case 'Urban Parks':
      return [11, 8, 13];
    case 'Street Trees':
      return [11, 8, 12, 13];
    case 'Woodland':
      return [11, 8, 13];
    default:
      return [];
  }
}

export function getSDGDetailsFromId(SDGNumber) {
  // function to get the SDG details from the SDG ID
  switch (SDGNumber) {
    case '11':
      return {
        number: 11,
        name: 'Sustainable Cities and Communities',
        description: 'WIP',
        image: 'SDG11Image',
      };
    case '8':
      return {
        number: 8,
        name: 'Decent Work and Economic Growth',
        description: 'WIP',
        image: 'SDG8Image',
      };
    case '12':
      return {
        number: 12,
        name: 'Responsible Consumption and Production',
        description: 'WIP',
        image: 'SDG12Image',
      };
    case '13':
      return {
        number: 13,
        name: 'Climate Action',
        description: 'WIP',
        image: 'SDG13Image',
      };
  }
}
