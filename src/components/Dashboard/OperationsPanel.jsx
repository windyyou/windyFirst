import React from 'react';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import { Link } from 'react-router';

const TimelineItem = Timeline.Item;

export default class OperationsPanel extends React.Component {
  renderOperations(data) {
    if (data.length) {
      return (
        <Timeline pending={<Link to="/app/operations">查看更多</Link>}>
          {data.map((operation, i) =>
            <TimelineItem key={i} color={operation.color}>
              <div className="timeline-item-panel">
                <div className="timeline-title">
                  <Link to={`/app/operations/${operation.id}`}><h4>{operation.title}</h4></Link>
                  <p>
                    <small className="text-muted">
                      <Icon type="clock-circle-o" />{operation.timestamp}
                    </small>
                  </p>
                </div>
                <div className="timeline-body">
                  <p>{operation.details}</p>
                </div>
              </div>
            </TimelineItem>
          )}
        </Timeline>
      );
    }

    return (<span>没有操作记录</span>);
  }

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { isFetching, error, data } = this.props.operation.list;
    const operations = error ? this.renderError(error) : this.renderOperations(data);

    return (
      <div className="panel timeline-panel panel-default">
        <div className="panel-heading">
          <Icon type="calendar" /> 操作记录
        </div>
        <div className="panel-body">
          {isFetching ? this.renderFetching() : operations}
        </div>
      </div>
    );
  }
}

OperationsPanel.propTypes = {
  operation: React.PropTypes.shape({
    list: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        timestamp: React.PropTypes.string.isRequired,
        details: React.PropTypes.string.isRequired,
        color: React.PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};
