const typologies_names = [
  {
    id: 1,
    title: 'Woodland',
    saf_url: 'woodland_typology',
    description: 'Typology description',
    users: 'some stats',
    value: 'forest',
    minDBH: 4.77,
    maxDBH: 4.77,
    species: 'conifer',
  },
  {
    id: 2,
    title: 'Street Trees',
    saf_url: 'street_typology',
    description: 'Typology description',
    users: 'some stats',
    value: 'park',
    minDBH: 15,
    maxDBH: 15,
    species: 'conifer',
  },
  {
    id: 3,
    title: 'Trees in Vacant Lands',
    saf_url: 'park_typology',
    description: 'Typology description',
    users: 'some stats',
    value: 'tree in VDL',
    minDBH: 7,
    maxDBH: 30,
    species: 'conifer',
  },
];

export function get_typologies() {
  return typologies_names;
}
