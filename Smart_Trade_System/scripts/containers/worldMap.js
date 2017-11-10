import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//import Highcharts from 'highcharts';
import Odometer from 'react-odometerjs';

import { bindActionCreators } from 'redux';
import * as actions from '../actions/recommendationsActions';

import { getForCurr, getAgainstCurr, getTimePeriod, getRequestedHistory } from '../selectors/recommendations';

  var body = null;
  var stage = null;
  var nullObject = document.createElement('div');
  var cardElementArray = [];
  var cardDataArray = [];
  var spacerZ = 50, maxDrag = 300, perspective = 800;
  var throwSpeed = 0;


class WorldMap extends Component {

  componentDidMount() {
    this.renderWorldMap();
  }

  componentWillReceiveProps(nextPorps) {
    this.renderWorldMap();
  }

  render() {
    return (<div>
      <div id="mapContainer"></div>
        { this.renderDropDowns() }
       </div>
    );
  }


  renderDropDowns() {
    const firstArray = [{name:'Australian Dollar' , symbol: 'AUD'},
      {name: 'Canadian Dollar' , symbol: 'CAD'},
      {name: 'EURO', symbol: 'EUR'},
      {name: 'British Pound', symbol: 'GBP'},
      {name: 'Japanese Yen', symbol: 'AUD'},
      {name: 'New Zealand Dollar', symbol: 'NZD'},
      {name: 'US Dollar', symbol: 'USD'}
    ];
    const dropDownRows = firstArray.map((curr,index)=> {
      return(<option key={index} value={curr.symbol}>{curr.name}</option>)
    })
    const {
      forCurr,
      againstCurr,
      timePeriod
    } = this.props;
    return (
      <div id="slectContainer">
            <div id="select" className="select">
              <select onChange={this.onFieldChange.bind(this, 'forCurr')}>
                <option value=''>Select a Currency</option>
                {dropDownRows}
              </select>
            </div>
            <div id="select" className="select">
               <select onChange={this.onFieldChange.bind(this, 'againstCurr')}>
                <option value=''>Select a Currency</option>
                {dropDownRows}
              </select>
           </div>
           <div id="select" className="select">
               <select onChange={this.onFieldChange.bind(this, 'timePeriod')}>
                <option value=''>Select Time Period</option>
                <option value='30'>One Month</option>
                <option value='180'>6 Months</option>
                <option value='365'>One Year</option>
                <option value='730'>Two Years</option>
              </select>
           </div>
           <div id="statsButton">
             <button className="button" onClick={this.props.actions.getHistoricalData.bind(this, forCurr, againstCurr, timePeriod)}>Get Historical Data</button>
           </div>
       <div id="stats">
          {this.showHistoricalStats()}
       </div>
      </div>
    );
  }

  onFieldChange(fieldName, e) {
    this.props.actions.onRecommendationFieldChange(fieldName, e.target.value);
            setTimeout(function(){ this.renderWorldMap(this)}, 3000);
  }

  showHistoricalStats() {
    const stats = this.props.requestedHistory;
    if(!stats){
      return;
    }
    if(stats.length===0) {
      return (<p>No Records For This Selection. Please Try Again</p>);
    }
    const highest = stats.reduce((high,stat)=>{
      if(high>=stat.high)
        return high;
      return stat.high;
    })
    const lowest = stats.reduce((low,stat)=>{
      if(low<=stat.low)
        return low;
      return stat.low;
    })
    let average = 0;
    let sum = 0;
    stats.forEach((stat)=>{
       sum = sum + stat.close;
    })
    average = parseFloat((sum/(stats.length)).toFixed(5));
    return (
      <div>
      <div>
      <div className="odoDiv">
        <label className="odometerLabel">Highest value in this time period:</label>
        <Odometer value={highest} className="odometer" options={{ format: '(dddd).ddddd', duration: 3000 }} />
      </div>
      <div className="odoDiv">
        <label className="odometerLabel">Lowest value in this time period:</label>
        <Odometer value={lowest} className="odometer" options={{ format: '(dddd).ddddd', duration: 3000 }} />
      </div>
     <div className="odoDiv">
        <label className="odometerLabel">Average value in this time period</label>
        <Odometer value={average} className="odometer" options={{ format: '(dddd).ddddd', duration: 3000 }} />
     </div>
      </div>
      </div>
    );

  }

  renderWorldMap() {
    Highcharts.theme = {
     colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
        '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
     chart: {
        backgroundColor: {
           linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
           stops: [
              [0, '#2a2a2b'],
              [1, '#3e3e40']
           ]
        },
        style: {
           fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
     },
     title: {
        style: {
           color: '#E0E0E3',
           textTransform: 'uppercase',
           fontSize: '20px'
        }
     },
     subtitle: {
        style: {
           color: '#E0E0E3',
           textTransform: 'uppercase'
        }
     },
     xAxis: {
        gridLineColor: '#707073',
        labels: {
           style: {
              color: '#E0E0E3'
           }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
           style: {
              color: '#A0A0A3'

           }
        }
     },
     yAxis: {
        gridLineColor: '#707073',
        labels: {
           style: {
              color: '#E0E0E3'
           }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
           style: {
              color: '#A0A0A3'
           }
        }
     },
     tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
           color: '#F0F0F0'
        }
     },
     plotOptions: {
        series: {
           dataLabels: {
              color: '#B0B0B3'
           },
           marker: {
              lineColor: '#333'
           }
        },
        boxplot: {
           fillColor: '#505053'
        },
        candlestick: {
           lineColor: 'white'
        },
        errorbar: {
           color: 'white'
        }
     },
     legend: {
        itemStyle: {
           color: '#E0E0E3'
        },
        itemHoverStyle: {
           color: '#FFF'
        },
        itemHiddenStyle: {
           color: '#606063'
        }
     },
     credits: {
        style: {
           color: '#666'
        }
     },
     labels: {
        style: {
           color: '#707073'
        }
     },

     drilldown: {
        activeAxisLabelStyle: {
           color: '#F0F0F3'
        },
        activeDataLabelStyle: {
           color: '#F0F0F3'
        }
     },

     navigation: {
        buttonOptions: {
           symbolStroke: '#DDDDDD',
           theme: {
              fill: '#505053'
           }
        }
     },

     // scroll charts
     rangeSelector: {
        buttonTheme: {
           fill: '#505053',
           stroke: '#000000',
           style: {
              color: '#CCC'
           },
           states: {
              hover: {
                 fill: '#707073',
                 stroke: '#000000',
                 style: {
                    color: 'white'
                 }
              },
              select: {
                 fill: '#000003',
                 stroke: '#000000',
                 style: {
                    color: 'white'
                 }
              }
           }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
           backgroundColor: '#333',
           color: 'silver'
        },
        labelStyle: {
           color: 'silver'
        }
     },

     navigator: {
        handles: {
           backgroundColor: '#666',
           borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
           color: '#7798BF',
           lineColor: '#A6C7ED'
        },
        xAxis: {
           gridLineColor: '#505053'
        }
     },

     scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
     },

     // special colors for some of the
     legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
     background2: '#505053',
     dataLabelsColor: '#B0B0B3',
     textColor: '#C0C0C0',
     contrastTextColor: '#F0F0F3',
     maskColor: 'rgba(255,255,255,0.3)'
  };


  Highcharts.setOptions(Highcharts.theme);
    const EUR = [['at', 1],['be', 1],['bg', 1],['hr', 1],['cy', 1],['cz', 1],['dk', 1],['ee', 1],['fi', 1],['fr', 1],['de', 1],['gr', 1],['hu', 1],['ie', 1],['it', 1],['lv', 1],['lt', 1],['lu', 1],['mt', 1],['nl', 1],['pl', 1],['pt', 1],['ro', 1],['sk', 1],['si', 1],['es', 1],['se', 1]];
    const USD = ['us', 1];
    const AUD = ['au', 1];
    const CAD = ['ca', 1];
    const GBP = ['gb', 1];
    const JPY = ['jp', 1];
    const NZD = ['nz', 1];

    const allCurr = [
                  ['at', 1],
                  ['be', 1],
                  ['bg', 1],
                  ['hr', 1],
                  ['cy', 1],
                  ['cz', 1],
                  ['dk', 1],
                  ['ee', 1],
                  ['fi', 1],
                  ['fr', 1],
                  ['de', 1],
                  ['gr', 1],
                  ['hu', 1],
                  ['ie', 1],
                  ['it', 1],
                  ['lv', 1],
                  ['lt', 1],
                  ['lu', 1],
                  ['mt', 1],
                  ['nl', 1],
                  ['pl', 1],
                  ['pt', 1],
                  ['ro', 1],
                  ['sk', 1],
                  ['si', 1],
                  ['es', 1],
                  ['se', 1],
                  ['gb', 1],
                  ['us', 1],
                  ['in', 1],
                  ['ca', 1],
                  ['nz', 1],
                  ['au', 1],
                  ['jp', 1],
                  ['ch', 1]
                  ];

    let dataArray = [];
    if(this.props.forCurr) {
      switch(this.props.forCurr) {
        case 'EUR': {
          EUR.forEach((ele) => {
            dataArray.push(ele);
          })
          break;
        }
        case 'USD': {
          dataArray.push(USD);
          break;
        }

        case 'AUD': {
          dataArray.push(AUD);
          break;
        }
        case 'CAD': {
          dataArray.push(CAD);
          break;
        }
        case 'GBP': {
          dataArray.push(GBP);
          break;
        }

        case 'JPY': {
          dataArray.push(JPY);
          break;
        }

        case 'NZD': {
          dataArray.push(NZD);
          break;
        }

         default:
          dataArray = [];
      }

    }


    if(this.props.againstCurr) {
      switch(this.props.againstCurr) {
        case 'EUR': {
          EUR.forEach((ele) => {
            dataArray.push(ele);
          })
          break;
        }
        case 'USD': {
          dataArray.push(USD);
          break;
        }

        case 'AUD': {
          dataArray.push(AUD);
          break;
        }
        case 'CAD': {
          dataArray.push(CAD);
          break;
        }
        case 'GBP': {
          dataArray.push(GBP);
          break;
        }

        case 'JPY': {
          dataArray.push(JPY);
          break;
        }

        case 'NZD': {
          dataArray.push(NZD);
          break;
        }

        default:
          dataArray = [];
      }
    }

    if(!this.props.forCurr && !this.props.againstCurr) {
      dataArray = allCurr;
    }

      return Highcharts.mapChart("mapContainer", {
          chart: {
              borderWidth: 1
          },

          title: {
              text: 'Countries/Currencies IntellaTrade Recommends'
          },
          subtitle: {
              text: 'We have recommendations for all the highlighted countries'
          },

          legend: {
              enabled: false
          },

          series: [{
              name: 'Country',
              mapData: Highcharts.maps['custom/world'],
              data:dataArray,
              dataLabels: {
                  enabled: true,
                  color: '#FFFFFF',
                  formatter: function () {
                      if (this.point.value) {
                          return this.point.name;
                      }
                  }
              },
              tooltip: {
                  headerFormat: '',
                  pointFormat: '{point.name}'
              }
          }]
      });
  }



}

const mapStateToProps = (state) => ({
  forCurr: getForCurr(state),
  againstCurr: getAgainstCurr(state),
  timePeriod: getTimePeriod(state),
  requestedHistory: getRequestedHistory(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);
