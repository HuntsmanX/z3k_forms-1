import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

import Header from "./header";

@inject("s")
@observer
class ContentWrapper extends Component {

  render() {
    const { s: { ui }, children } = this.props;

    return (
      <div>
        <div id="wrap">
          <Header />

          <Row>
            <Column>
              <div id="page-title">
                <h1>{ui.pageTitle}</h1>
              </div>
            </Column>
          </Row>

          <Row>
            <Column>
              <div id="content-wrapper">{children}</div>
            </Column>
          </Row>

          <div id="push" />
        </div>
        <div id="footer">Copyright © 2016 Z3K Forms</div>
      </div>
    );
  }

};

export default ContentWrapper;
