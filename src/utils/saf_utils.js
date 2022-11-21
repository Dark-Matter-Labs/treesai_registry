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
    fixedDBH: 7,
    minDBH: 7,
    maxDBH: 15,
  },
  {
    id: 1,
    title: 'Urban Parks',
    description:
      'Area of land normally enclosed, designed, constructed, maintained and managed  as a public park or garden',
    value: 'park',
    species: 'conifer',
    image: urbanParksImage,
    fixedDBH: 4.77,
    minDBH: 7,
    maxDBH: 15,
  },
  {
    id: 2,
    title: 'Woodland',
    description:
      'Area of land composed of trees established through planting and/or deliberate seeding',
    value: 'forest',
    species: 'conifer',
    image: woodlandsImage,
    fixedDBH: 4.77,
    minDBH: 4.77,
    maxDBH: 15,
  },
];

const maintenance_types = [
  {
    name: 'Low',
    title: '1 x year',
    description: 'WIP',
    value: 0,
    id: 0,
  },
  {
    name: 'Medium',
    title: '1 x month',
    description: 'WIP',
    value: 1,
    id: 1,
  },
  {
    name: 'High',
    title: '1 x week',
    description: 'WIP',
    value: 2,
    id: 2,
  },
];

export function get_typologies() {
  return typologies_names;
}

export function get_maintenance_scopes() {
  return maintenance_types;
}
