import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Link from "./../shared/link";

@inject("s")
@observer
class Header extends Component {

  componentDidMount() {
    $(document).foundation();
  }

  render() {
    const { session, session: { user } } = this.props.s;

    return (
      <div id="header" >
        <Row>
          <Column large={12}>
            <div className="top-bar">
              <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>

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
                    <Link to="newResponse">New Response</Link>
                  </li>

                  <li>
                    <a>Settings</a>
                    <ul className="menu vertical">
                      <li>
                        <Link to="mistakeTypes">Mistake Types</Link>
                      </li>
                    </ul>
                  </li>

                </ul>
              </div>
              <div className="top-bar-right">
                <ul className="menu">
                  <li>
                    {user.isSignedIn ? (
                      <div>
                        <li className="user-avatar" style={{backgroundImage: 'url(' + STAFF_API_URL+user.avatarUrl + ')'}}></li>
                        <li><a onClick={session.destroy.bind(session)}>Sign Out</a></li>
                      </div>
                    ) : null}
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
