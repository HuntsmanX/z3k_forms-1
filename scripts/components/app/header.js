import React, { Component } from "react";
import { inject } from "mobx-react";
import views from "./../../views";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

import { Link } from "mobx-router";

@inject("s")
class Header extends Component {

  render() {
    const { router } = this.props.s;

    return (
      <div id="header" >
        <Row>
          <Column large={12}>
            <div className="top-bar">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="menu-text app-title">
                    <Link router={router} view={views.dashboard}>Z3K Forms</Link>
                  </li>
                  <li>
                    <Link router={router} view={views.tests}>Tests</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Column>
        </Row>
      </div>
    );
  }

};

export default Header;
