export function onLoginFieldChange(type, value) {
  return {
    type: 'LOGIN_FIELD_CHANGE',
    fieldType: type,
    value
  };
}

export function onLogin(userName, password) {
  return dispatch =>
  fetch("http://localhost:8082/login", {
    method: "POST"
  }).then(response => response.json())
        .then(json => dispatch({
          type: 'GET_LOGIN_STATUS',
          json,
          userName,
          password
        }))
        .catch(err => { throw err; });
}