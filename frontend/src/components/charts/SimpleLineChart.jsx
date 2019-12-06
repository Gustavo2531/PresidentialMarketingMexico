import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area} from 'recharts';

class CustomizedLabel extends Component {
  render () {
    const {x, y, stroke, value} = this.props;

   	return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
  }
}

class CustomizedDot extends Component {
    render() {
        const {payload} = this.props;

        let fill,stroke, radius;
        if(payload.anomaly) {
            fill =  "#ffffff";
            stroke = "#d70700";
            radius = 8;
        } else {
            fill = this.props.fill;
            stroke = this.props.stroke;
            radius = 5;
        }

        return(
            <circle className="recharts-dot"
                    cx={this.props.cx}
                    cy={this.props.cy}
                    stroke={stroke}
                    fill = {fill}
                    strokeWidth={3}
                    r={radius}
            />

        )
    }
}

class CustomizedAxisTick extends Component {
  render () {
    const {x, y, stroke, payload} = this.props;

   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

class SimpleLineChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            data: [
                  {
            "name": "Fri Jan 19 2018",
            "total": 722,
            "anomaly": 1
        },
        {
            "name": "Sat Jan 20 2018",
            "total": 4368,
            "anomaly": 0
        },
        {
            "name": "Sun Jan 21 2018",
            "total": 5561,
            "anomaly": 0
        },
        {
            "name": "Mon Jan 22 2018",
            "total": 5562,
            "anomaly": 0
        },
        {
            "name": "Tue Jan 23 2018",
            "total": 6062,
            "anomaly": 0
        },
        {
            "name": "Wed Jan 24 2018",
            "total": 5946,
            "anomaly": 0
        },
        {
            "name": "Thu Jan 25 2018",
            "total": 5726,
            "anomaly": 0
        },
        {
            "name": "Fri Jan 26 2018",
            "total": 4893,
            "anomaly": 0
        },
        {
            "name": "Sat Jan 27 2018",
            "total": 4408,
            "anomaly": 0
        },
        {
            "name": "Sun Jan 28 2018",
            "total": 8225,
            "anomaly": 0
        },
        {
            "name": "Mon Jan 29 2018",
            "total": 6399,
            "anomaly": 0
        },
        {
            "name": "Tue Jan 30 2018",
            "total": 6440,
            "anomaly": 0
        },
        {
            "name": "Wed Jan 31 2018",
            "total": 6804,
            "anomaly": 0
        },
        {
            "name": "Thu Feb 01 2018",
            "total": 6586,
            "anomaly": 0
        },
        {
            "name": "Fri Feb 02 2018",
            "total": 5411,
            "anomaly": 0
        },
        {
            "name": "Sat Feb 03 2018",
            "total": 4524,
            "anomaly": 0
        },
        {
            "name": "Sun Feb 04 2018",
            "total": 5351,
            "anomaly": 0
        },
        {
            "name": "Mon Feb 05 2018",
            "total": 5983,
            "anomaly": 0
        },
        {
            "name": "Tue Feb 06 2018",
            "total": 6079,
            "anomaly": 0
        },
        {
            "name": "Wed Feb 07 2018",
            "total": 6546,
            "anomaly": 0
        },
        {
            "name": "Thu Feb 08 2018",
            "total": 5834,
            "anomaly": 0
        },
        {
            "name": "Fri Feb 09 2018",
            "total": 4778,
            "anomaly": 0
        },
        {
            "name": "Sat Feb 10 2018",
            "total": 4422,
            "anomaly": 0
        },
        {
            "name": "Sun Feb 11 2018",
            "total": 5501,
            "anomaly": 0
        },
        {
            "name": "Mon Feb 12 2018",
            "total": 5242,
            "anomaly": 0
        },
        {
            "name": "Tue Feb 13 2018",
            "total": 6121,
            "anomaly": 0
        },
        {
            "name": "Wed Feb 14 2018",
            "total": 5853,
            "anomaly": 0
        },
        {
            "name": "Thu Feb 15 2018",
            "total": 6057,
            "anomaly": 0
        },
        {
            "name": "Fri Feb 16 2018",
            "total": 4684,
            "anomaly": 0
        },
        {
            "name": "Sat Feb 17 2018",
            "total": 4290,
            "anomaly": 0
        },
        {
            "name": "Sun Feb 18 2018",
            "total": 6418,
            "anomaly": 0
        },
        {
            "name": "Mon Feb 19 2018",
            "total": 6239,
            "anomaly": 0
        },
        {
            "name": "Tue Feb 20 2018",
            "total": 6275,
            "anomaly": 0
        },
        {
            "name": "Wed Feb 21 2018",
            "total": 6151,
            "anomaly": 0
        },
        {
            "name": "Thu Feb 22 2018",
            "total": 6014,
            "anomaly": 0
        },
        {
            "name": "Fri Feb 23 2018",
            "total": 4436,
            "anomaly": 0
        },
        {
            "name": "Sat Feb 24 2018",
            "total": 4416,
            "anomaly": 0
        },
        {
            "name": "Sun Feb 25 2018",
            "total": 6086,
            "anomaly": 0
        },
        {
            "name": "Mon Feb 26 2018",
            "total": 6718,
            "anomaly": 0
        },
        {
            "name": "Tue Feb 27 2018",
            "total": 6921,
            "anomaly": 0
        },
        {
            "name": "Wed Feb 28 2018",
            "total": 7229,
            "anomaly": 0
        },
        {
            "name": "Thu Mar 01 2018",
            "total": 6809,
            "anomaly": 0
        },
        {
            "name": "Fri Mar 02 2018",
            "total": 5193,
            "anomaly": 0
        },
        {
            "name": "Sat Mar 03 2018",
            "total": 4934,
            "anomaly": 0
        },
        {
            "name": "Sun Mar 04 2018",
            "total": 6858,
            "anomaly": 0
        },
        {
            "name": "Mon Mar 05 2018",
            "total": 6831,
            "anomaly": 0
        },
        {
            "name": "Tue Mar 06 2018",
            "total": 7039,
            "anomaly": 0
        },
        {
            "name": "Wed Mar 07 2018",
            "total": 6648,
            "anomaly": 0
        },
        {
            "name": "Thu Mar 08 2018",
            "total": 6326,
            "anomaly": 0
        },
        {
            "name": "Fri Mar 09 2018",
            "total": 5067,
            "anomaly": 0
        },
        {
            "name": "Sat Mar 10 2018",
            "total": 4679,
            "anomaly": 0
        },
        {
            "name": "Sun Mar 11 2018",
            "total": 6662,
            "anomaly": 0
        },
        {
            "name": "Mon Mar 12 2018",
            "total": 6075,
            "anomaly": 0
        },
        {
            "name": "Tue Mar 13 2018",
            "total": 6262,
            "anomaly": 0
        },
        {
            "name": "Wed Mar 14 2018",
            "total": 6532,
            "anomaly": 0
        },
        {
            "name": "Thu Mar 15 2018",
            "total": 7006,
            "anomaly": 0
        },
        {
            "name": "Fri Mar 16 2018",
            "total": 5245,
            "anomaly": 0
        },
        {
            "name": "Sat Mar 17 2018",
            "total": 4966,
            "anomaly": 0
        },
        {
            "name": "Sun Mar 18 2018",
            "total": 6246,
            "anomaly": 0
        },
        {
            "name": "Mon Mar 19 2018",
            "total": 6489,
            "anomaly": 0
        },
        {
            "name": "Tue Mar 20 2018",
            "total": 6658,
            "anomaly": 0
        },
        {
            "name": "Wed Mar 21 2018",
            "total": 7088,
            "anomaly": 0
        },
        {
            "name": "Thu Mar 22 2018",
            "total": 5775,
            "anomaly": 0
        },
        {
            "name": "Fri Mar 23 2018",
            "total": 4796,
            "anomaly": 0
        },
        {
            "name": "Sat Mar 24 2018",
            "total": 4479,
            "anomaly": 0
        },
        {
            "name": "Sun Mar 25 2018",
            "total": 5090,
            "anomaly": 0
        },
        {
            "name": "Mon Mar 26 2018",
            "total": 282,
            "anomaly": 1
        }
            ]
        }
    }

    render() {
        return(
            <ResponsiveContainer width="100%" height={450}>
                <LineChart data={this.props.data}
                       margin={{top: 20, right: 30, left: 20, bottom: 30}}>
                    <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick/>}/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>

                    <Line type="monotone" dataKey="total" stroke="#716aca" strokeWidth={4} dot={<CustomizedDot/>} />


                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default SimpleLineChart
