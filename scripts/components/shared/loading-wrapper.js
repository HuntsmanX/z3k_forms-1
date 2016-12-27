import React from "react";

import Loader from "./loader";

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

const LoadingWrapper = (props) => (
  <div className="loading-wrapper" style={Object.assign({}, style, props.style)}>
    {props.spinner ? <Loader /> : null}
  </div>
);

export default LoadingWrapper;
