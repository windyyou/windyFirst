import React from 'react';
import Icon from 'antd/lib/icon';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line,
  CartesianGrid, Tooltip, Legend } from 'recharts';

export default class MonitorChart extends React.Component {
  render() {
    return (
      <div>
        <div className="panel panel-default monitor-chart-panel">
          <div className="panel-heading">
            <Icon type="line-chart" /> {this.props.title}
          </div>
          <div className="panel-body">
            <ResponsiveContainer>
              <LineChart data={this.props.data}
                margin={{ top: 5, right: 35, left: 20, bottom: 5 }}>
                <XAxis dataKey={this.props.xaxis} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                {this.props.line.map((line, i) => <Line
                  key={i}
                  type="monotone"
                  dot={false}
                  dataKey={line}
                  stroke={this.props.lineColor[i]}
                  strokeWidth={2}
                />)}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}
