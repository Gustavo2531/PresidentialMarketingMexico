import React, { Component } from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class MultipleBarChart extends Component {
    render() {

        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={this.props.data}>
                    <CartesianGrid strokeDasharray = "3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="Enojado" fill="#e17055" />
                    <Bar dataKey="Triste" fill="#81ecec" />
                    <Bar dataKey="Temeroso" fill="#74b9ff" />
                    <Bar dataKey="Sorprendido" fill="#a29bfe" />
                    <Bar dataKey="Disgustado" fill="#ff7675" />
                    <Bar dataKey="Feliz" fill="#6c5ce7" />
                    <Bar dataKey="Neutral" fill="#fab1a0" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default MultipleBarChart
