import Immutable from 'immutable';

const initialState = Immutable.Map({
  dailyRecommendations: Immutable.List()
});

export default function recommendations(state = initialState, action) {
  switch (action.type) {

    case 'GET_RECOMMENDATIONS': {
     return state.set('dailyRecommendations', action.json);
    }

    case 'GET_HISTORY': {
    	return state.set('historicalData', action.json);
    }

    case 'RECOMMENDATION_FIELD_CHANGE': {
      return state.set(action.fieldName, action.fieldValue);
    }

    case 'GET_HISTORY_FOR_TIMEPERIOD': {
      return state.set('requestedHistory', action.json);
    }

    default:
      return state;
  }
}
