export const SocialDeprivationStyles = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'SIMD2020v2',
      stops: [
        [376.5, '#d7191c'],
        [823, '#e85b3a'],
        [1340, '#f99e59'],
        [1943, '#fec980'],
        [2660, '#ffedaa'],
        [3530, '#edf7c9'],
        [4550, '#c7e6db'],
        [5463, '#9dcfe4'],
        [6137.5, '#64a5cd'],
        [6970, '#2c7bb6'],
      ],
    },
    'fill-opacity': 0.6,
  },
};

export const LocationScoringStyles = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'Risk_score',
      stops: [
        [8.06, '#edf8fb'],
        [13.02, '#edf8fb'],
        [15.49, '#c7dceb'],
        [17.16, '#a6bbda'],
        [19.11, '#8c96c6'],
        [20.8, '#896bb2'],
        [23.11, '#863e99'],
        [29.67, '#810f7c'],
      ],
    },
    'fill-opacity': 0.6,
  },
};

export const SubBasinStyles = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'Portfolio',
      stops: [
        [0.9, '#9b9b9b'],
        [1, '#729b6f'],
      ],
    },
    'fill-opacity': 0.6,
  },
};
