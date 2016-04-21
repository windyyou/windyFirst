import React from 'react';
import Icon from 'antd/lib/icon';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line,
  CartesianGrid, Tooltip, Legend } from 'recharts';

export default class MonitorChart extends React.Component {
  renderMonitorChart(props) {
    let metric = {};
    const lines = [];
    const lineColor = ['#8884d8', '#82ca9d'];
    if (props.data.metrics.length) {
      metric = props.data.metrics[0];
    }

    for (const key of Object.keys(metric)) {
      if (key !== 'timestamp') {
        lines.unshift(key);
      }
    }

    return (
      <div className="panel-body">
        <ResponsiveContainer>
          <LineChart data={props.data.metrics} margin={{ top: 5, right: 35, left: 20, bottom: 5 }}>
            <XAxis dataKey={props.xaxis} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {lines.map((line, i) => <Line
              key={i}
              type="monotone"
              dot={false}
              dataKey={line}
              stroke={lineColor[i]}
              strokeWidth={2}
            />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  renderFetching() {
    return (
      <span>loading</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const data = this.props.data;
    const show = data.error ?
      this.renderError(data.error) : this.renderMonitorChart(this.props);

    return (
      <div>
        <div className="panel panel-default monitor-chart-panel">
          <div className="panel-heading">
            <Icon type="line-chart" /> {this.props.title}
          </div>
            {data.isFetching ? this.renderFetching() : show}
        </div>
      </div>
    );
  }
}

MonitorChart.propTypes = {
  data: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    metrics: React.PropTypes.array,
    error: React.PropTypes.object,
  }).isRequired,
  title: React.PropTypes.string.isRequired,
  xaxis: React.PropTypes.string.isRequired,
};
