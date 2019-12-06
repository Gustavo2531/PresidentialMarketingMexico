import React, { Component } from 'react';
import {ResponsiveContainer, PieChart, Sector, Pie, Cell} from 'recharts';

class ActiveShapePieChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0
        }
        this.onPieEnter = this.onPieEnter.bind(this);
    }

    onPieEnter(data, index) {
        this.setState(...this.state, {
            activeIndex: index,
        })
    }

    renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{fontWeight: 'bold'}}>{payload.name}</text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 2}
                    outerRadius={outerRadius + 6}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill} style={{fontWeight: 'bold'}}>{`${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={fill}>
                    {`(${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    }

    render() {
        return(
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        activeIndex = {this.state.activeIndex}
                        activeShape = {this.renderActiveShape}
                        data = {this.props.data}
                        innerRadius = {50}
                        outerRadius = {70}
                        fill = "#8884d8"
                        onMouseEnter={this.onPieEnter}
                        dataKey = 'value'
                    >
                        {this.props.data.map((entry, index) => <Cell fill={this.props.colors[index % this.props.colors.length]}/>)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        )
    }
}

export default ActiveShapePieChart
