import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationSystem from 'react-notification-system';
import {Table} from 'reactable';
import { Jumbotron } from 'reactstrap';

import * as actions from '../actions/tradeActions';
import * as liveActions from '../actions/liveActions';

import { getSelectedPair, getBuySellType, getTradeAmount, getTradeRate, getManualTradeMessage, getAllTrades, getDailyRecommendations, getLiveData, getClosedDeals } from '../selectors/trade';

const propTypes = {
  modal: PropTypes.string,
};

    let currAskRate, currBidRate;

class TradeDashboard extends Component {

constructor(props) {
    super(props);
    this.state = {
level: 'success'
    };
  }

  componentWillMount() {
    //this.props.actions.getAllTrades();
    this.props.actions.getAllTrades();
    this.props.actions.getAllClosedDeals();
  }

  componentDidMount() {
    this.props.actions.getRecommendations();
    this.connect();
  }

  render() {
  	return (
        <div className="tradeDashboard">
          <div id="notification">
            { this.renderNotification() }
          </div>
    		  { this.renderTradeForm() }
          { this.renderRecommendations() }
          { this.renderCurrent() }
        <div className="allTrades">
          {this.renderOpenTranscations()}
          {this.renderClosedTransactions()}
        </div>
        </div>
    );
  }

  onMessage(evt) {
    this.props.liveActions.updateLiveData(evt.data);
  }

  connect() {
    const wsocket = new WebSocket("ws://ec2-54-193-121-31.us-west-1.compute.amazonaws.com:8080/gaincapital-websocket-rateservice/broadcast");
    wsocket.onmessage = this.onMessage.bind(this);
  }

  renderNotification() {
    return (
      <NotificationSystem ref="notificationSystem"  />
    );
  }

  onTradeFormFieldChange(fieldName, e) {
    this.props.actions.onTradeFormFieldChange(fieldName, e.target.value);
    if(fieldName==='pair') {
      this.props.actions.getRecommendations();
    }
  }

  renderOpenTranscations() {
    const data =  this.props.allTrades;
    if(data) {
      return (
        <div className="allTrades">
        <label className="deals">All Open Deals Till Date</label>
        <Table  data={data} itemsPerPage={10} pageButtonLimit={5} defaultSort={{column: 'status', direction: 'desc'}} noDataText="No Records Found."/>
        </div>
    );
    }
    return null;
  }

  renderClosedTransactions() {
    const data = this.props.closedDeals;
    if(data) {
      return (
        <div className="allTrades">
        <label className="deals">All Closed Deals Till Date</label>
        <Table  data={data} itemsPerPage={10} pageButtonLimit={5} defaultSort={{column: 'status', direction: 'desc'}} noDataText="No Records Found."/>
        </div>
    );
    }
    return null;
  }

  onManualTradeClick(e) {
    e.preventDefault();
    this.props.actions.onManualTradeClick(this.props.pair, this.props.type, this.props.amount, this.props.rate).then(() => {
    this.notificationSystem = this.refs.notificationSystem;
    const manualTrade = this.props.manualTrade;
    if(manualTrade.success) {
      this.setState({level:'success'});
    }
    else {
      this.setState({level:'error'});
    }
    this.notificationSystem.addNotification({
      message: manualTrade.message || manualTrade,
      level: this.state.level
    })});
    this.props.actions.getAllTrades();
  }

  renderCurrent() {
    let pair = this.props.pair;
    let liveData = this.props.liveData;
    if(liveData && liveData.rateDelta.ccyPair === this.props.pair) {
       currAskRate = liveData.rateDelta.ask;
       currBidRate = liveData.rateDelta.bid;
    }
    if(currBidRate && currAskRate && pair) {
      return(
        <div>
          <div className="spot-tile1">
            <span className="heading">Ask</span>
            <div className="spot-tile__price-movement1">
              {currAskRate}
            </div>
          </div>
          <div className="spot-tile1">
          <span className="heading">Bid</span>
            <div className="spot-tile__price-movement1">
              {currBidRate}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  renderRecommendations() {
    const recommendations = this.props.recommendations;
    var currAskRate, currBidRate;
    let pair = this.props.pair;
    let liveData = this.props.liveData;
    if(pair) {
      pair = pair.split('/');
      pair = pair[0]+' '+pair[1];
    }
    let buyRecommend = recommendations.filter((record, i)=> {
      return (record.symbol == pair) && (record.type=='buy');
    });

    let sellRecommend = recommendations.filter((record, i)=> {
      return (record.symbol == pair) && (record.type=='sell');
    });

      return (
      <div className="sideBlock">
      {this.renderBuyRecos(buyRecommend)}
      {this.renderSellRecos(sellRecommend)}
      </div>
      );

  }

  renderBuyRecos(buyRecommend) {
    if(buyRecommend[0]) {
      return (
      <div>
      <div className="spot-tile">
        <span className="heading">Buy</span>
        <div className="spot-tile__price-movement">
          {buyRecommend[0].price}
        </div>
      </div>
      <div className="spot-tile">
        <span className="heading">Sell: Take Profit</span>
        <div className="spot-tile__price-movement">
          {buyRecommend[0].takeprofit}
        </div>
      </div>
      <div className="spot-tile">
        <span className="heading">Sell: Stop Loss</span>
        <div className="spot-tile__price-movement">
          {buyRecommend[0].stoploss}
        </div>
      </div>
      </div>
    );
    }
    return null;
  }

  renderSellRecos(sellRecommend) {
    if(sellRecommend[0]) {
       return (
      <div>
      <div className="spot-tile">
        <span className="heading">Sell</span>
        <div className="spot-tile__price-movement">
          {sellRecommend[0].price}
        </div>
      </div>
      <div className="spot-tile">
        <span className="heading">Buy: Take Profit</span>
        <div className="spot-tile__price-movement">
          {sellRecommend[0].takeprofit}
        </div>
      </div>
      <div className="spot-tile">
        <span className="heading">Buy: Stop Loss</span>
        <div className="spot-tile__price-movement">
          {sellRecommend[0].stoploss}
        </div>
      </div>
      </div>
    );
    }
    return null;
  }

  doNothing() {

  }

  renderTradeForm() {
    return (
      <div className="tradeForm">
        <h2 className="heading1">Manual Trade</h2>
        <form>
          <label htmlFor="fname">Pairs</label>
          <div className="select1" id="select1">
            <select  name="country"  onChange={ this.onTradeFormFieldChange.bind(this, 'pair') }>
              <option>Select a Pair</option>
              <option value="EUR/USD">EUR/USD</option>
              <option value="USD/EUR">USD/EUR</option>
              <option value="USD/CAD">USD/CAD</option>
              <option value="CAD/USD">CAD/USD</option>
              <option value="EUR/GBP">EUR/GBP</option>
              <option value="GBP/EUR">GBP/EUR</option>
              <option value="NZD/USD">NZD/USD</option>
              <option value="USD/NZD">USD/NZD</option>
              <option value="JPY/USD">JPY/USD</option>
              <option value="USD/JPY">USD/JPY</option>
              <option value="AUD/JPY">AUD/JPY</option>
              <option value="JPY/AUD">JPY/AUD</option>
              <option value="CAD/JPY">CAD/JPY</option>
              <option value="JPY/CAD">JPY/CAD</option>
              <option value="EUR/JPY">EUR/JPY</option>
              <option value="JPY/EUR">JPY/EUR</option>
              <option value="USD/GBP">USD/GBP</option>
              <option value="GBP/USD">GBP/USD</option>
              <option value="CHF/USD">CHF/USD</option>
              <option value="USD/CHF">USD/CHF</option>
            </select>
          </div>
          <label>Buy/Sell</label>
          <div className="select1" id="select1">
            <select  name="country" onChange={ this.onTradeFormFieldChange.bind(this, 'type') }>
              <option>Select Buy/Sell</option>
              <option value="B">BUY</option>
              <option value="S">SELL</option>
            </select>
          </div>

          <label>Amount</label>
          <input type="text" className="formInput" onChange={ this.onTradeFormFieldChange.bind(this, 'amount') } placeholder="Enter an Amount"/>

          <label>Rate</label>
          <input type="text" className="formInput" onChange={ this.onTradeFormFieldChange.bind(this, 'rate') } placeholder="Enter a Rate"/>

          <button  className="formSubmit"  onClick={ this.onManualTradeClick.bind(this) }>Submit</button>
        </form>
      </div>
    );
  }
}


TradeDashboard.propTypes = propTypes;

const mapStateToProps = (state) => ({
  pair: getSelectedPair(state),
  type: getBuySellType(state),
  amount: getTradeAmount(state),
  rate: getTradeRate(state),
  manualTrade: getManualTradeMessage(state),
  allTrades: getAllTrades(state),
  recommendations: getDailyRecommendations(state),
  liveData: getLiveData(state),
  closedDeals: getClosedDeals(state)
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
  liveActions: bindActionCreators(liveActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeDashboard);