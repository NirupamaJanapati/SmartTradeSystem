import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { navigateTo } from '../actions/NavigatorActions';

import { bindActionCreators } from 'redux';
import * as actions from '../actions/loginActions';
import { getUserName, getPassword, getErrorMessage, getLoginStatus } from '../selectors/login';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <div className="welcome">
      <div className="welcomeWrap">
        <div className="welcomeContainer">
          <section id="loginSection" className="loginWindow">
            <div className="logo">
              <a className="no-hover" href="/" target="_blank">
                  <div className="logoImg"></div>
              </a>
              <div className="secondaryLogo">IntellaTrade<sup>™</sup></div>
              <div id="versionDiv" className="versionNumber"></div>
            </div>
            <div className="formFramework">
                <input type="hidden" id="request_source" name="request_source" value=""/>
                <div className="formList">
                  <div className="formItem">
                    <label htmlFor="username" className="loginLabel">Username</label>
                    <input type="text" className="inputFull loginInput" id="username" name="username" placeholder="User Name" tabIndex="1" onChange={this.onLoginFieldChange.bind(this, 'userName')}/>
                  </div>
                  <div className="formItem">
                    <label className="loginLabel" htmlFor="password">Password</label>
                    <input className="inputFull loginInput" type="password" id="password" name="password" placeholder="Password" tabIndex="2" onChange={this.onLoginFieldChange.bind(this, 'password')}/>
                  </div>
                </div>
                { this.renderErrorMessage() }
                { this.renderRedirect() }
                <div className="btnWrapper">
                  <button id="btnSubmit" className="btnForm primaryButton" onClick={this.onLogin.bind(this)} tabIndex="4">Login</button>
                </div>
            </div>
          </section>
          <footer className="loginFooter">
          </footer>
        </div>
      </div>
      </div>
    );
  }

  renderErrorMessage() {
    if(this.props.errorMessage!=='' && this.props.errorMessage) {
      return (
        <span className="errorMsg">
          <span className="glyphicons glyphicons-exclamation-sign"></span>
          <span>{this.props.errorMessage}</span>
        </span>
      );
    }
    return null;
  }

  onLogin() {
    this.props.actions.onLogin(this.props.userName, this.props.password);
    if(this.props.loginStatus===true) {
      this.setState({isLoggedIn: true});
      this.props.navigateTo('/');
    }
  }

  onLoginFieldChange(type, e) {
    this.props.actions.onLoginFieldChange(type, e.target.value);
  }

  renderRedirect() {
    if(this.state.isLoggedIn) {
      <Redirect to="/dashboard"/>
    }
    return null;
  }

}


const mapStateToProps = (state) => ({
  userName: getUserName(state),
  password: getPassword(state),
  errorMessage: getErrorMessage(state),
  loginStatus: getLoginStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  navigateTo: bindActionCreators(navigateTo, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
