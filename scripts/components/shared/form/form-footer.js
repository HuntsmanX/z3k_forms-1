import React, { Component } from "react";

class FormFooter extends Component {

  render() {
    const { float, children } = this.props;

    return (
      <footer className="clearfix">
        <div className={`float-${float}`}>
          {children}
        </div>
      </footer>
    );
  }

}

FormFooter.defaultProps = {
  float: 'right'
}

export default FormFooter;
