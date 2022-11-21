function getSDGIdsFromTypology(typology = 'street tree') {
  // function to get the SDGs from the typology
  switch (typology) {
    case 'Urban Parks':
      return [11, 8, 13];
    case 'Street Trees':
      return [11, 8, 12, 13];
    case 'Woodland':
      return [11, 8, 13];
  }
}
