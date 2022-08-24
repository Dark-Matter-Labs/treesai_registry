const cities = ['Glasgow', 'Other'];

const typologyTabs = [
  { name: 'Trees', current: true },
  { name: 'SuDS(Coming soon)', current: false },
];

const stages = [
  'Strategic Development',
  'Pre-planning Application',
  'Post-planning Application',
  'Construction',
  'Maintenance & Monitoring',
  'Completed/Archived',
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

const budgetTypes = [
  { name: '£0,00', enabled: true, value: 0 },
  { name: '£0 - 50K', enabled: true, value: 1 },
  { name: '£51 - 100K', enabled: true, value: 2 },
  { name: '£101 - 500K', enabled: true, value: 3 },
  { name: '£2M +', enabled: true, value: 4 },
];

const raisedTypes = [
  { name: '£0,00', enabled: true, value: 0 },
  { name: '£0 - 50K', enabled: true, value: 1 },
  { name: '£51 - 100K', enabled: true, value: 2 },
  { name: '£101 - 500K', enabled: true, value: 3 },
  { name: '£2M +', enabled: true, value: 4 },
];

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

export function get_budget_types() {
  return budgetTypes;
}

export function get_raised_types() {
  return raisedTypes;
}
