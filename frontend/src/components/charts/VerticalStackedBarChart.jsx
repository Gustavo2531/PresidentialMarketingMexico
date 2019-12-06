import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line} from 'recharts';

class VerticalStackedBarChart extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <ResponsiveContainer width="100%" height={350}>
                <BarChart layout = "vertical" data={this.props.data}
                         margin={{top: 20, right: 30, left: 150, bottom: 5}}>
                    <XAxis type="number"/>
                    <YAxis dataKey="name" type="category"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="positive" stackId="a" fill="#34bfa3" />\
                    <Bar dataKey="negative" stackId="a" fill="#f4516c" />
                    <Bar dataKey="neutral" stackId="a" fill="#636e72" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default VerticalStackedBarChart
