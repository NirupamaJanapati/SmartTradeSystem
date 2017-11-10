import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as actions from '../actions/recommendationsActions';
import { getDailyRecommendations } from '../selectors/recommendations';
import WorldMap from './worldMap';
import intersectionBy from 'lodash.intersectionby';

class Recommendations extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     showRecommendations: false
  //   };
  // }

  componentWillMount() {
    this.props.actions.getRecommendations();
    //this.props.actions.getHistoricalData();
  }

  render() {
    return (<div>
              <WorldMap/>
              <div>
    				    { this.renderSellRecommendations() }
                { this.renderBuyRecommendations()  }
    			   </div>
           </div>
  			);
  }

  renderSellRecommendations() {
    const records = this.props.dailyRecommendations;
    let sellRecords = records.filter(rec => rec.type === 'sell');
    sellRecords = intersectionBy(sellRecords, 'symbol');
    const rows = sellRecords.map((record, i)=> {
      return (
        <tr key={i}>
          <td>{record.datetime}</td>
          <td>{record.day}</td>
          <td>{record.price}</td>
          <td>{record.stoploss}</td>
          <td>{record.symbol}</td>
          <td>{record.takeprofit}</td>
        </tr>
      );
    });

    return (
    <div style={{display: 'inline-block'}}>
      <table id="sell">
        <caption>Sell Recommendations for this day</caption>
        <tr>
          <th> DateTime </th>
          <th> Day </th>
          <th> Price </th>
          <th> Stop Loss </th>
          <th> Symbol </th>
          <th> Take Profit </th>
        </tr>
        { rows }
      </table>
    </div>
    );
  }

  renderBuyRecommendations() {
    const records = this.props.dailyRecommendations;
    let buyRecords = records.filter(rec => rec.type === 'buy');
    buyRecords = intersectionBy(buyRecords, 'symbol');
    const rows = buyRecords.map((record, i)=> {
      return (
        <tr key={i}>
          <td>{record.datetime}</td>
          <td>{record.day}</td>
          <td>{record.price}</td>
          <td>{record.stoploss}</td>
          <td>{record.symbol}</td>
          <td>{record.takeprofit}</td>
        </tr>
      );
    });

    return (
       <div style={{display: 'inline-block'}}>
        <table id="buy">
          <caption>Buy Recommendations for this day</caption>
          <tr>
            <th> DateTime </th>
            <th> Day </th>
            <th> Price </th>
            <th> Stop Loss </th>
            <th> Symbol </th>
            <th> Take Profit </th>
          </tr>
          { rows }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	dailyRecommendations: getDailyRecommendations(state)
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);