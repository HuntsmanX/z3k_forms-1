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
    const { session, session: { currentUser, ifAllowed } } = this.props.s;

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

                  {ifAllowed('forms:test', 'view',
                    <li>
                      <Link to="tests">Tests</Link>
                    </li>
                  )}

                  {ifAllowed('forms:response', 'view',
                    <li>
                      <Link to="responses">Responses</Link>
                    </li>
                  )}

                  {ifAllowed('forms:response', 'create',
                    <li>
                      <Link to="newResponse">New Response</Link>
                    </li>
                  )}

                  {ifAllowed('forms:mistake_type', 'view', 'staff:user', 'view', 'staff:role', 'view',
                    <li>
                      <a>Settings</a>
                      <ul className="menu vertical">
                        {ifAllowed('forms:mistake_type', 'view',
                          <li>
                            <Link to="mistakeTypes">Mistake Types</Link>
                          </li>
                        )}

                        {ifAllowed('staff:user', 'view',
                          <li>
                            <Link to="users">Users</Link>
                          </li>
                        )}

                        {ifAllowed('staff:role', 'view',
                          <li>
                            <Link to="roles">Roles</Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
              <div className="top-bar-right">
                {currentUser.isSignedIn ? (
                  <ul className="menu">
                    <li className="user-avatar" style={{ backgroundImage: `url('${currentUser.avatarUrl}')` }}></li>
                    <li><a onClick={session.destroy.bind(session)}>Sign Out</a></li>
                  </ul>
                ) : null}
              </div>
            </div>
          </Column>
        </Row>
      </div>
    );
  }

};

export default Header;
