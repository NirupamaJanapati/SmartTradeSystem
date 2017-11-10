import React, { Component, PropTypes } from 'react';
//import { loginUser, logoutUser } from '../actions/AuthedActions';
import Link from '../components/Link';
//import NavSearch from '../components/NavSearch';
import Popover from '../components/Popover';
import { getImageUrl } from '../utils/SongUtils';

class Nav extends Component {

  logout(e) {
  localStorage.clear();
  }

  renderNavUser() {
      return (
        <Popover className="nav-user">
          <div className="nav-user-link">
            <img
              alt="user avatar"
              className="nav-authed-image"
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQVweT2JjPPtTGCYy9MrlBZE6H9shhkSgCFu7K71FrW5xGf0aWP"
            />
             <p style={{marginLeft: '10px'}}>{this.props.userName}</p>
            <i className="icon ion-chevron-down"></i>
            <i className="icon ion-chevron-up"></i>
          </div>
          <div className="nav-user-popover popover-content">
            <ul className="nav-user-popover-list">
              <li className="nav-user-popover-item">
                <a href='/' onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          </div>
        </Popover>
      );
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="nav">
        <div className="container clearfix">
          <div className="nav-logo">
          </div>
          <div className="nav-nav float-left">
            <div className="nav-nav-item">
              <Link
                className="nav-nav-item-link active"
                dispatch={dispatch}
                route={{ path: ['live'] }}>
                IntellaTrade
              </Link>
            </div>
          </div>
          <div className="nav-nav float-right">
            <div className="nav-nav-item">
              <div className="nav-user-link">
              <Link className="nav-nav-item-link"
                dispatch={dispatch}
                route={{ path: ['live'] }}>Live</Link>
              </div>
            </div>
            <div className="nav-nav-item">
              <div className="nav-user-link">
              <Link className="nav-nav-item-link"
                dispatch={dispatch}
                route={{ path: ['recommendations'] }}>Recommendations</Link>
              </div>
            </div>
            <div className="nav-nav-item">
              <div className="nav-user-link">
              <Link className="nav-nav-item-link"
                dispatch={dispatch}
                route={{ path: ['trade'] }}>Trade</Link>
              </div>
            </div>
            <div className="nav-nav-item">
              {this.renderNavUser()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Nav;
