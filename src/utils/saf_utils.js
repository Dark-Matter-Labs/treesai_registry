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
  },
];

export function get_typologies() {
  return typologies_names;
}
