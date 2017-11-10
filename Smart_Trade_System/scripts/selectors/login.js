export const getUserName = state => state.login.get('userName');
export const getPassword = state => state.login.get('password');
export const getErrorMessage = state => state.login.get('errorMessage');
export const getLoginStatus = state => state.login.get('loginStatus');