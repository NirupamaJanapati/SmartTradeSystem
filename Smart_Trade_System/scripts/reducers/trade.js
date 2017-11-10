import Immutable from 'immutable';

const initialState = Immutable.Map({
});

export default function recommendations(state = initialState, action) {
  switch (action.type) {

    case 'TRADE_FORM_FIELD_CHANGE': {
     return state.setIn(['tradeForm', action.fieldName], action.fieldValue);
    }

    case 'GET_ALL_TRADES': {
    	return state.set('allTrades', JSON.parse(action.json));
    }

    case 'DO_MANUAL_TRADE': {
        console.log(action);
        let response
        try {
           response = JSON.parse(action.json);
        } catch(e) {
           response = action.json;
        }
        return state.set('manualTrade',response);
    }

    case 'UPDATE_LIVE_DATA': {
      return state.set('liveData', JSON.parse(action.data));
    }

    case 'GET_CLOSED_DEALS': {
      return state.set('closedDeals', action.json);
    }

    default:
      return state;
  }
}
