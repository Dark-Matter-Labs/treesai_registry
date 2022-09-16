import streetTreeImage from '../images/street-trees.png';
import urbanParksImage from '../images/urban-park.png';
import woodlandsImage from '../images/woodland.png';

const typologies_names = [
  {
    id: 0,
    title: 'Street Trees',
    description: 'A street tree is any tree growing within the public-right-of-way',
    value: 'individual_street_trees',
    species: 'conifer',
    image: streetTreeImage,
    costLow: 2262,
    costMed: 2397,
    costHigh: 2532,
    imperviousPercent: 90, // not in use, delete
    perviousPercent: 10, // not in use, delete
    minDensity: 10, // autofill median!
    maxDensity: 30,
    evergreenPercent: 60, // not in use, delete
    decidiousPercent: 40, // not in use, delete
    fixedDBH: 7,
    minDBH: 7,
    maxDBH: 15,
    minHeight: 5, // not in use, delete
    maxHeight: 12, // not in use, delete
    maintenance_type: 2, // not in use, delete
  },
  {
    id: 1,
    title: 'Urban Parks',
    description:
      'Area of land normally enclosed, designed, constructed, maintained and managed  as a public park or garden',
    value: 'park',
    species: 'conifer',
    image: urbanParksImage,
    costLow: 2262,
    costMed: 2397,
    costHigh: 2532,
    imperviousPercent: 10,
    perviousPercent: 90,
    minDensity: 50,
    maxDensity: 250,
    evergreenPercent: 60,
    decidiousPercent: 40,
    fixedDBH: 4.77,
    minDBH: 7,
    maxDBH: 15,
    minHeight: 5,
    maxHeight: 40,
    maintenance_type: 2,
  },
  {
    id: 2,
    title: 'Woodland',
    description:
      'Area of land composed of trees established through planting and/or deliberate seeding',
    value: 'forest',
    species: 'conifer',
    image: woodlandsImage,
    costLow: 406,
    costMed: 483,
    costHigh: 514,
    imperviousPercent: 0,
    perviousPercent: 100,
    minDensity: 1000,
    maxDensity: 1600,
    evergreenPercent: 100,
    decidiousPercent: 0,
    fixedDBH: 4.77,
    minDBH: 4.77,
    maxDBH: 15,
    minHeight: 5,
    maxHeight: 14,
    maintenance_type: 2,
  },
];

const maintenance_types = [
  { name: 'Low', enabled: true, value: 0 },
  { name: 'Medium', enabled: true, value: 1 },
  { name: 'High', enabled: true, value: 2 },
];

export function get_typologies() {
  return typologies_names;
}

export function get_maintenance_scopes() {
  return maintenance_types;
}
