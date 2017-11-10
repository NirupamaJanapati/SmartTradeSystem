import React, { Component, PropTypes } from 'react';
import Websocket from 'react-websocket';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table} from 'reactable';

import ReactAutoScroll from 'react-to-target-auto-scroll';

import * as actions from '../actions/liveActions';

import { getLiveData } from '../selectors/trade';
let liveArray = [];
let options = {multiTooltipTemplate: "<%=datasetLabel%> : <%= value %>"};
let setCCYPair1 = "EUR/GBP";
let ctx1 = null;
let iCount1 = 0;
			let one = {};
			let two = {};
			let three = {};
			let four = {};
			let five = {};
			let six = {};
			let seven = {};
			let eight = {};
let data1 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel1 = 0;
let liveLineChart1 = null;


let setCCYPair2 = "EUR/USD";
let ctx2 = null;
let iCount2 = 0;
let data2 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel2 = 0;
let liveLineChart2 = null;


let setCCYPair3 = "USD/CAD";
let ctx3 = null;
let iCount3 = 0;
let data3 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel3 = 0;
let liveLineChart3 = null;


let setCCYPair4 = "GBP/USD";
let ctx4 = null;
let iCount4 = 0;
let data4 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel4 = 0;
let liveLineChart4 = null;

let setCCYPair5 = "NZD/USD";
let ctx5 = null;
let iCount5 = 0;
let data5 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel5 = 0;
let liveLineChart5 = null;

let setCCYPair6 = "AUD/USD";
let ctx6 = null;
let iCount6 = 0;
let data6 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel6 = 0;
let liveLineChart6 = null;

let setCCYPair7 = "USD/JPY";
let ctx7 = null;
let iCount7 = 0;
let data7 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel7 = 0;
let liveLineChart7 = null;


let setCCYPair8 = "CAD/JPY";
let ctx8 = null;
let iCount8 = 0;
let data8 = {
	labels : [],
	datasets : [
		{
			label: 'Ask',
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			label: 'Bid',
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};
let latestLabel8 = 0;
let liveLineChart8 = null;

class LiveDashboard extends Component {

	constructor(props) {
		super(props);
 	}

	componentDidMount() {
		this.connect();
		ctx1 = document.getElementById("chartjsCanvas1").getContext("2d");
		ctx2 = document.getElementById("chartjsCanvas2").getContext("2d");
		ctx3 = document.getElementById("chartjsCanvas3").getContext("2d");
		ctx4 = document.getElementById("chartjsCanvas4").getContext("2d");
		ctx5 = document.getElementById("chartjsCanvas5").getContext("2d");
		ctx6 = document.getElementById("chartjsCanvas6").getContext("2d");
		ctx7 = document.getElementById("chartjsCanvas7").getContext("2d");
		ctx8 = document.getElementById("chartjsCanvas8").getContext("2d");

		liveLineChart1 = new Chart(ctx1).Line(data1, options);
		liveLineChart2 = new Chart(ctx2).Line(data2, options);
		liveLineChart3 = new Chart(ctx3).Line(data3, options);
		liveLineChart4 = new Chart(ctx4).Line(data4, options);
		liveLineChart5 = new Chart(ctx5).Line(data5, options);
		liveLineChart6 = new Chart(ctx6).Line(data6, options);
		liveLineChart7 = new Chart(ctx7).Line(data7, options);
		liveLineChart8 = new Chart(ctx8).Line(data8, options);
	}

	componentWillReceiveProps(newProps) {
		const rateDelta = newProps.liveData && newProps.liveData.rateDelta;
		if (rateDelta && rateDelta.ccyPair === setCCYPair1) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart1.addData([askRate, bidRate], ++latestLabel1);
			++iCount1;
			if (iCount1 > 20) {
				liveLineChart1.removeData();
			}
		}
		if (rateDelta && rateDelta.ccyPair === setCCYPair2) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart2.addData([askRate, bidRate], ++latestLabel2);
			++iCount2;
			if (iCount2 > 20) {
				liveLineChart2.removeData();
			}
		}

		if (rateDelta && rateDelta.ccyPair === setCCYPair3) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart3.addData([askRate, bidRate], ++latestLabel3);
			++iCount3;
			if (iCount3 > 20) {
				liveLineChart3.removeData();
			}
		}

		if (rateDelta && rateDelta.ccyPair === setCCYPair4) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart4.addData([askRate, bidRate], ++latestLabel4);
			++iCount4;
			if (iCount4 > 20) {
				liveLineChart4.removeData();
			}
		}

		if (rateDelta && rateDelta.ccyPair === setCCYPair5) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart5.addData([askRate, bidRate], ++latestLabel5);
			++iCount5;
			if (iCount5 > 20) {
				liveLineChart5.removeData();
			}
		}

		if (rateDelta && rateDelta.ccyPair === setCCYPair6) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart6.addData([askRate, bidRate], ++latestLabel6);
			++iCount6;
			if (iCount6 > 20) {
				liveLineChart6.removeData();
			}
		}

		if (rateDelta && rateDelta.ccyPair === setCCYPair7) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart7.addData([askRate, bidRate], ++latestLabel7);
			++iCount7;
			if (iCount7 > 20) {
				liveLineChart7.removeData();
			}
		}

		if (rateDelta && rateDelta.ccyPair === setCCYPair8) {
			var askRate = rateDelta.ask;
			var bidRate = rateDelta.bid;
			var ccyPair = rateDelta.ccyPair;
			liveLineChart8.addData([askRate, bidRate], ++latestLabel8);
			++iCount8;
			if (iCount8 > 20) {
				liveLineChart8.removeData();
			}
		}

		const showArray = [setCCYPair1, setCCYPair2, setCCYPair3, setCCYPair4, setCCYPair5, setCCYPair6, setCCYPair7, setCCYPair8]

				if(showArray.indexOf(rateDelta.ccyPair)) {
			switch(rateDelta.ccyPair) {
				case setCCYPair1: {
					one = rateDelta;
					break;
				}

				case setCCYPair2: {
					two = rateDelta;
					break;
				}

				case setCCYPair3: {
					three = rateDelta;
					break;
				}

				case setCCYPair4: {
					four = rateDelta;
					break
				}

				case setCCYPair5: {
					five = rateDelta;
					break
				}

				case setCCYPair6: {
					six = rateDelta;
					break
				}

				case setCCYPair7: {
					seven = rateDelta;
					break
				}

				case setCCYPair8: {
					eight = rateDelta;
					break
				}

				default: {
					break;
				}
			}
		}

		liveArray = [one,two,three,four,five,six,seven,eight];
	}

	renderContinuosTable() {
		if(liveArray.length>0) {

		return (
        <div
          ref="scrollExample"
          style={{ overflow: 'scroll', width: '50%', height: '2000px', float:'right', 'margin': '5px' }}
          >
           <div style={{ height: '2000px' , width: '100%'}}>
           <label className="graph">Live Data</label>
           	<Table  data={liveArray} itemsPerPage={10} noDataText="No Records Found."/>
           </div>
         </div>
		);
		}
		return null;
	}

	render() {
		return (
			<div>
				<div style={{marginLeft: '40px', float:'left'}}>
					<label className="graph">Live Streaming for EUR/GBP</label>
					<canvas id="chartjsCanvas1" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
					<label className="graph">Live Streaming for EUR/USD</label>
					<canvas id="chartjsCanvas2" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
					<label className="graph">Live Streaming for USD/CAD</label>
					<canvas id="chartjsCanvas3" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
					<label className="graph">Live Streaming for GBP/USD</label>
					<canvas id="chartjsCanvas4" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
					<label className="graph">Live Streaming for NZD/USD</label>
					<canvas id="chartjsCanvas5" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
					<label className="graph">Live Streaming for AUD/USD</label>
					<canvas id="chartjsCanvas6" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
					<label className="graph">Live Streaming for USD/JPY</label>
					<canvas id="chartjsCanvas7" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
					<label className="graph">Live Streaming for CAD/JPY</label>
					<canvas id="chartjsCanvas8" width="500" height="300" style={{marginRight: '30px', marginTop: '30px'}}></canvas>
				</div>
				{this.renderContinuosTable()}
			</div>
		);
	}

	onMessage(evt) {
		this.props.actions.updateLiveData(evt.data);
	}

	connect() {
		const wsocket = new WebSocket("ws://ec2-54-193-121-31.us-west-1.compute.amazonaws.com:8080/gaincapital-websocket-rateservice/broadcast");
		wsocket.onmessage = this.onMessage.bind(this);
	}

}

const mapStateToProps = (state) => ({
  liveData : getLiveData(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(LiveDashboard);