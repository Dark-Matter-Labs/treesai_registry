const cities = ['Glasgow', 'Other'];

const typologyTabs = [
  { name: 'Trees', current: true },
  { name: 'SuDS(Coming soon)', current: false },
];

const stages = [
  'Strategic Development',
  'Pre-Planning Application',
  'Post-Planning Application',
  'Construction',
  'Maintenance & Monitoring',
  'Completed',
];

const landUse = [
  'Recreation',
  'Transport',
  'Residential',
  'Industrial and Commercial',
  'Administrative',
  'Vacant Land',
];

const activityTypes = [
  { name: 'Developing', enabled: true },
  { name: 'Maintaining', enabled: true },
];

const pieChartTypes = ['high maintenance', 'medium maintenance', 'low maintenance'];

export function get_cities() {
  return cities;
}

export function get_typologies_types() {
  return typologyTabs;
}

export function get_stages() {
  return stages;
}

export function get_land_use() {
  return landUse;
}

export function get_activity_types() {
  return activityTypes;
}

export function get_piechart_types() {
  return pieChartTypes;
}
