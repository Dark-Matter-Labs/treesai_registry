import streetTreeImage from '../images/street-trees.png';
import urbanParksImage from '../images/urban-park.png';
import woodlandsImage from '../images/woodland.png';
import vdlImage from '../images/VDL.png';

const typologies_names = [
  {
    id: 0,
    title: 'Street Trees',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'park',
    minDBH: 7,
    maxDBH: 15,
    species: 'conifer',
    image: streetTreeImage,
    costLow: 2262,
    costMed: 2397,
    costHigh: 2532,
  },
  {
    id: 1,
    title: 'Urban Parks',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'park',
    minDBH: 7,
    maxDBH: 15,
    species: 'conifer',
    image: urbanParksImage,
    costLow: 1,
    costMed: 1,
    costHigh: 1,
  },
  {
    id: 2,
    title: 'Woodland',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'forest',
    minDBH: 4.77,
    maxDBH: 15,
    species: 'conifer',
    image: woodlandsImage,
    costLow: 406,
    costMed: 483,
    costHigh: 514,
  },

  {
    id: 3,
    title: 'Trees in Vacant Lands',
    description: 'TLorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'tree in VDL',
    minDBH: 7,
    maxDBH: 30,
    species: 'conifer',
    image: vdlImage,
    costLow: 12.85,
    costMed: 12.85,
    costHigh: 12.85,
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
