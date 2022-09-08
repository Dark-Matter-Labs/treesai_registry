const districts = [
  { value: 'Auchenshuggle and Tollcross', label: 'Auchenshuggle and Tollcross' },
  { value: 'Baillieston', label: 'Baillieston' },
  { value: 'Barrhead', label: 'Barrhead' },
  { value: 'Blairdardie and Old Drumchapel', label: 'Blairdardie and Old Drumchapel' },
  { value: 'Bridgeton and Dalmarnock', label: 'Bridgeton and Dalmarnock' },
  { value: 'Carmunnock', label: 'Carmunnock' },
  { value: 'Carmyle', label: 'Carmyle' },
  { value: 'Castlemilk', label: 'Castlemilk' },
  { value: 'Cranhill', label: 'Cranhill' },
  { value: 'Croftfoot and Menock', label: 'Croftfoot and Menock' },
  { value: 'Crosshill and Govanhill', label: 'Crosshill and Govanhill' },
  { value: 'Dundasvale', label: 'Dundasvale' },
  { value: 'Drumchapel', label: 'Drumchapel' },
  { value: 'Garthamlock, Craigend and Gartloch', label: 'Garthamlock, Craigend and Gartloch' },
  { value: 'Govan East', label: 'Govan East' },
  { value: 'High Knightswood and Anniesland', label: 'High Knightswood and Anniesland' },
  {
    value: 'Hillington, North Cardonald and Penilee',
    label: 'Hillington, North Cardonald and Penilee',
  },
  { value: 'Kelvindale', label: 'Kelvindale' },
  { value: 'Knightswood', label: 'Knightswood' },
  { value: 'Levern and District', label: 'Levern and District' },
  { value: 'Maryhill and Summerston', label: 'Maryhill and Summerston' },
  { value: 'Milngavie', label: 'Milngavie' },
  { value: 'Pollok North', label: 'Pollok North' },
  { value: 'Possilpark', label: 'Possilpark' },
  { value: 'Robroyston', label: 'Robroyston' },
  { value: 'Ruchill', label: 'Ruchill' },
  { value: 'Sighthill, Royston and Germiston', label: 'Sighthill, Royston and Germiston' },
  { value: 'Springburn', label: 'Springburn' },
  { value: 'West Durbanshire', label: 'West Durbanshire' },
  { value: 'Yoker', label: 'Yoker' },
];

const typologies = [
  { value: 'Filter strips and Swales', label: 'Filter strips and Swales' },
  { value: 'Infiltrations', label: 'Infiltrations' },
  { value: 'River restoration', label: 'River restoration' },
  { value: 'Street trees', label: 'Street trees' },
  {
    value: 'Storage Facilities (basins, raingardens, wetlands, etc.)',
    label: 'Storage Facilities (basins, raingardens, wetlands, etc.)',
  },
  { value: 'Trees in Vacant or Derelict Land', label: 'Trees in Vacant or Derelict Land' },
  { value: 'Woodland', label: 'Woodland' },
];

const stages = [
  { value: 'Strategic Development', label: 'Strategic Development' },
  { value: 'Pre-Planning Application', label: 'Pre-Planning Application' },
  { value: 'Post-Planning Application', label: 'Post-Planning Application' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Maintenance & Monitoring', label: 'Maintenance & Monitoring' },
  { value: 'Completed', label: 'Completed' },
];

export function get_districts() {
  return districts;
}

export function get_typologies() {
  return typologies;
}

export function get_stages() {
  return stages;
}
