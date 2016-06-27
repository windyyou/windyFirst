import React from 'react';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import { Link } from 'react-router';

import AbstractList from '../../containers/AbstractList';
const TimelineItem = Timeline.Item;

function getColor(status) {
  // TODO: need some i18n work...
  return {
    成功: 'green',
    失败: 'red',
    运行中: 'blue',
    等待中: 'blue',
    success: 'green',
    fail: 'red',
    running: 'blue',
    waiting: 'blue',
  }[status];
}

export default class OperationsPanel extends AbstractList {
  renderOperations(data) {
    if (data.length) {
      return (
        <Timeline pending={<Link to="/app/operations">查看更多</Link>}>
          {data.map((operation, i) =>
            <TimelineItem key={i} color={getColor(operation.status)}>
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
                  <p>
                    {operation.details.includes('message') ?
                    JSON.parse(operation.details).message : ''}
                  </p>
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
    // TODO: do limit at backend
    const operations = error ? this.renderError(error) : this.renderOperations(data.slice(0, 5));

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
        status: React.PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};
