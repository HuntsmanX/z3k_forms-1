import React from "react";

const style = {
  position:        'absolute',
  top:             0,
  bottom:          0,
  left:            0,
  right:           0,
  opacity:         0.5,
  backgroundColor: 'white',
  cursor:          'wait'
}

const LoadingWrapper = () => (
  <div className="loading-wrapper" style={style} />
);

export default LoadingWrapper;
