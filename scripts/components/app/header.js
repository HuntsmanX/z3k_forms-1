import React, { Component } from "react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";
import { Dropdown, LinkWithDropdown } from "react-foundation-components/lib/global/dropdown";
import { Button } from 'react-foundation-components/lib/global/button';

import Link from "./../shared/link";

class Header extends Component {

  render() {

    return (
      <div id="header" >
        <Row>
          <Column large={12}>
            <div className="top-bar">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="menu-text app-title">
                    <Link to="dashboard">Z3K Forms</Link>
                  </li>
                  <li>
                    <Link to="tests">Tests</Link>
                  </li>
                  <li>
                    <Link to="responses">Responses</Link>
                  </li>
                  <li>
                    <Link to="NewResponse">New Response</Link>
                  </li>
                  <li>
                    <LinkWithDropdown
                      dropdownContent={
                        <div>
                          <Link to="mistakeTypes">Mistake Types</Link>
                        </div>
                      }
                      closeOnClickOutside
                    >
                      <Button dropdown>Settings</Button>
                    </LinkWithDropdown>
                  </li>
                </ul>
              </div>
              <div className="top-bar-right">
                <ul className="menu">
                  <li>
                    <Link to="signIn">Sign In</Link>
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
