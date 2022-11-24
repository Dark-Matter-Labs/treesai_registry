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

/*
function getSDGDetailsFromId(SDGId) {
  // function to get the SDG details from the SDG ID
  switch (SDGId) {
    case 11:
      return {
        name: 'Sustainable Cities and Communities',
        description: 'WIP',
        // image: SDG11Image,
      };
    case 8:
      return {
        name: 'Decent Work and Economic Growth',
        description: 'WIP',
        // image: SDG8Image,
      };
    case 12:
      return {
        name: 'Responsible Consumption and Production',
        description: 'WIP',
        // image: SDG12Image,
      };
    case 13:
      return {
        name: 'Climate Action',
        description: 'WIP',
        // image: SDG13Image,
      };
  }
}
*/