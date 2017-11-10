import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initNavigator } from '../actions/NavigatorActions';

import { getUserName, getPassword, getErrorMessage, getLoginStatus } from '../selectors/login';

import NavContainer from '../containers/NavContainer';
import Recommendations from '../containers/Recommendations'
import LiveDashboard from '../containers/LiveDashboard';
import TradeDashboard from '../containers/TradeDashboard';
import Login from '../containers/Login';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.array.isRequired
};

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initNavigator());
  }

  renderContent() {
    const { path } = this.props;
    switch (path[0]) {
      case 'live':
        return <LiveDashboard/>;
      case 'recommendations':
        return <Recommendations/>;
      case 'trade':
        return <TradeDashboard/>;
      case 'users':
        return <UserContainer />;
      case 'me':
        return <MeContainer />;
      case 'login':
        return <Login />

      default:
        return <Recommendations/>;
    }
  }

  render() {
    if(localStorage.loginStatus && localStorage.loginStatus==='true') {
      return (
        <div>
          <NavContainer />
          {this.renderContent()}
        </div>
      );
    }
   return (
     <Login/>
   );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const { environment, navigator } = state;
  const { path } = navigator.route;
  const loginStatus = getLoginStatus(state);
  return {
    path,
    loginStatus
  };
}


export default connect(mapStateToProps)(App);
