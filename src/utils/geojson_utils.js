import Flood_Buildings from '../data/Flood_Buildings.json';

function get_all_cc_names(json) {
  let cc_names = [];
  for (let i = 0; i < json.features.length; i++) {
    cc_names.push(json.features[i].properties.cc_name);
  }
  // keep only unique values
  cc_names = cc_names.filter((v, i, a) => a.indexOf(v) === i);

  // order alphabetically
  cc_names.sort();

  return cc_names;
}

export function getCouncils() {
  let data = JSON.parse(JSON.stringify(Flood_Buildings));

  let ccs = get_all_cc_names(data);
  return ccs;
}

export function getCouncilInfo(cc_name) {
  let data = JSON.parse(JSON.stringify(Flood_Buildings));
  let cc_info = {};
  for (let i = 0; i < data.features.length; i++) {
    if (data.features[i].properties.cc_name === cc_name) {
      cc_info = data.features[i];
    }
  }
  return cc_info;
}
