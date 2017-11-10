

export function onTradeFormFieldChange(fieldName, fieldValue) {
  return {
    type: 'TRADE_FORM_FIELD_CHANGE',
    fieldName,
    fieldValue
  };
}

export function onManualTradeClick(pair, types, amount, rate) {
  let payload = {
    pair,
    types,
    amount,
    rate
  };
  return dispatch =>
     fetch('http://localhost:8082/doManualTrade', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => response.json())
        .then(json => dispatch({
        type: 'DO_MANUAL_TRADE',
        json
      }))
      .catch(err => { throw err; });
}

export function getAllTrades() {
  return dispatch =>
     fetch('http://localhost:8082/getAllTrades', {
      method: 'GET'
     }).then(response => response.json())
        .then(json => dispatch({
        type: 'GET_ALL_TRADES',
        json
      }))
      .catch(err => { throw err; });
}

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

export function getAllClosedDeals() {
  return dispatch =>
  fetch("http://localhost:8082/closedDeals", {
    method: "GET"
  }).then(response => response.json())
        .then(json => dispatch({
          type: 'GET_CLOSED_DEALS',
          json
        }))
        .catch(err => { throw err; });
}

