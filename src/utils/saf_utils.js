import streetTreeImage from '../images/street-trees.png';
import urbanParksImage from '../images/urban-park.png';
import woodlandsImage from '../images/woodland.png';
import vdlImage from '../images/VDL.png';

const typologies_names = [
  {
    id: 0,
    title: 'Street Trees',
    description:
      'A street tree is any tree growing within the public-right-of-way and is thus managed by the city.',
    value: 'park',

    species: 'conifer',
    image: streetTreeImage,
    costLow: 2262,
    costMed: 2397,
    costHigh: 2532,
    imperviousPercent: 90,
    perviousPercent: 10,
    minDensity: 10,
    maxDensity: 30,
    evergreenPercent: 60,
    decidiousPercent: 40,
    fixedDBH: 7,
    minDBH: 7,
    maxDBH: 15,
    minHeight: 5,
    maxHeight: 12,
    maintenance_type: 2,
  },
  {
    id: 1,
    title: 'Urban Parks',
    description:
      'Areas of land normally enclosed, designed, constructed, managed and maintained as a public park or garden. These may be owned or managed by community groups.',
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
      'Woodlands are areas of land composed of trees established through planting and/or deliberate seeding and which are being actively managed for provisioning services, climate regulation or both.',
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

  {
    id: 3,
    title: 'Trees in Vacant Lands',
    description:
      'Degraded lands present potential locations for tree plantations and tree preservation. Managed well, they can restore soil, sequester carbon, and produce wood resources in a more sustainable way.',
    value: 'tree in VDL',
    species: 'conifer',
    image: vdlImage,
    costLow: 12.85,
    costMed: 12.85,
    costHigh: 12.85,
    imperviousPercent: 10,
    perviousPercent: 90,
    minDensity: 50,
    maxDensity: 2000,
    evergreenPercent: 80,
    decidiousPercent: 20,
    fixedDBH: 4.77,
    minDBH: 7,
    maxDBH: 30,
    minHeight: 2,
    maxHeight: 6,
    maintenance_type: 1,
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
