import * as React from 'react';
import PropTypes from 'prop-types';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyleIndigo = {
  cursor: 'pointer',
  fill: '#4F46E5',
  stroke: 'none',
};

const pinStyleGreen = {
  cursor: 'pointer',
  fill: '#1EB792',
  stroke: 'none',
};

const pinStyleDark = {
  cursor: 'pointer',
  fill: '#828784',
  stroke: 'none',
};

const styleCheck = (isFeatured, inPortfolio) => {
  if (isFeatured && inPortfolio) {
    return pinStyleIndigo;
  } else if (inPortfolio) {
    return pinStyleIndigo;
  } else if (isFeatured) {
    return pinStyleGreen;
  } else {
    return pinStyleDark;
  }
};

function Pin(props, { size = 20 }) {
  return (
    <svg height={size} viewBox='0 0 24 24' style={styleCheck(props.isFeatured, props.inPortfolio)}>
      <path d={ICON} />
    </svg>
  );
}

Pin.propTypes = {
  size: PropTypes.number,
  isFeatured: PropTypes.bool,
  inPortfolio: PropTypes.bool,
};

export default React.memo(Pin);
