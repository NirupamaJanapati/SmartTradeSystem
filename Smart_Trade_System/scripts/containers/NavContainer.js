import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';


import { getUserName, getPassword, getErrorMessage, getLoginStatus } from '../selectors/login';

const propTypes = {
  isMobile: PropTypes.bool,
};

class NavContainer extends Component {
  render() {
    return <Nav {...this.props} />;
  }
}

function mapStateToProps(state) {
  const userName = localStorage.userName;

  return {
    userName
  };
}

NavContainer.propTypes = propTypes;

export default connect(mapStateToProps)(NavContainer);
