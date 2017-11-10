import Immutable from 'immutable';

const initialState = Immutable.Map({

});

export default function recommendations(state = initialState, action) {
  switch (action.type) {

    case 'LOGIN_FIELD_CHANGE': {
     return state.set(action.fieldType, action.value).
     set('loginStatus', false);
    }

    case 'GET_LOGIN_STATUS': {
      const loginRows = action.json;
      const userObj = loginRows.filter(row=> row.UserName===action.userName);
      if ((userObj.length>0) && userObj[0].Passord===action.password) {
        localStorage.setItem("loginStatus", true);
        localStorage.setItem("userName", action.userName);
        return state.set('loginStatus', localStorage.loginStatus).
        set('errorMessage', '');
      }
      if(userObj.length<=0) {
        localStorage.setItem("loginStatus", false);
        return state.set('errorMessage', 'Invalid User Name').
        set('loginStatus', localStorage.loginStatus);
      }
      localStorage.setItem("loginStatus", false);
      return state.set('errorMessage', 'Invalid Password').
      set('loginStatus', localStorage.loginStatus);
    }

    default:
      return state;
  }
}