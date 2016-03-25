import React from 'react';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';

const TimelineItem = Timeline.Item;

export default class OperationsPanel extends React.Component {
  renderOperations(entities) {
    if (entities.length) {
      return (
        <Timeline pending={<a href="#">查看更多</a>}>
          {entities.map((data, i) =>
            <TimelineItem key={i} color={data.color}>
              <div className="timeline-item-panel">
                <div className="timeline-title">
                  <h4>{data.title}</h4>
                  <p>
                    <small className="text-muted">
                      <Icon type="clock-circle-o" />{data.timestamp}
                    </small>
                  </p>
                </div>
                <div className="timeline-body">
                  <p>{data.details}</p>
                </div>
              </div>
            </TimelineItem>
          )}
        </Timeline>
      );
    } else {
      return <span>没有操作记录</span>;
    }
  }

  renderFetching() {
    return (
      <span>loading...</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { entities, isFetching, error } = this.props.operation;

    return (
      <div className="panel timeline-panel panel-default">
        <div className="panel-heading">
          <Icon type="calendar" /> 操作记录
        </div>
        <div className="panel-body">
          {isFetching ? this.renderFetching() : error ?
            this.renderError(error) : this.renderOperations(entities)}
        </div>
      </div>
    );
  }
}

OperationsPanel.propTypes = {
  operation: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      timestamp: React.PropTypes.string.isRequired,
      details: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
    })),
  }).isRequired,
};
