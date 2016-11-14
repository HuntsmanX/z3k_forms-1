import React from "react";
import Loader from "react-loader";

const options = {
  lines:     13,
  length:    10,
  width:     4,
  radius:    12,
  corners:   1,
  rotate:    0,
  direction: 1,
  color:     '#000',
  speed:     1,
  trail:     50,
  shadow:    false,
  hwaccel:   false,
  zIndex:    2e3,
  top:       '50%',
  left:      '50%',
  scale:     1.00
};

const Loader_ = () => (
  <div style={{ position: 'relative', minHeight: '10rem' }}>
    <Loader loaded={false} options={options} className="spinner" />
  </div>
);

export default Loader_;
