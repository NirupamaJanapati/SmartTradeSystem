import { combineReducers } from 'redux';
import navigator from '../reducers/navigator';
import recommendations from '../reducers/recommendations';
import login from '../reducers/login';
import trade from '../reducers/trade';

const rootReducer = combineReducers({
  navigator,
  login,
  trade,
  resources: recommendations
});

export default rootReducer;
