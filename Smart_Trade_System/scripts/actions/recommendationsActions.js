

export function getRecommendations() {
  return dispatch =>
     fetch('http://localhost:8082/recommendations')
      .then(response => response.json())
      .then(json => dispatch({
      	type: 'GET_RECOMMENDATIONS',
      	json
      }))
      .catch(err => { throw err; });
}

export function getHistoricalData(forCurr, againstCurr, timePeriod) {
  const payload = {
    forCurr,
    againstCurr,
    timePeriod
  }
  return dispatch =>
  fetch("http://localhost:8082/requestedHistory", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => response.json())
        .then(json => dispatch({
          type: 'GET_HISTORY_FOR_TIMEPERIOD',
          json
        }))
        .catch(err => { throw err; });
}

export function onRecommendationFieldChange(fieldName, fieldValue) {
  return {
    type: 'RECOMMENDATION_FIELD_CHANGE',
    fieldName,
    fieldValue
  };
}
