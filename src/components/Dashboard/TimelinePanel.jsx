import React from 'react';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';

const TimelineItem = Timeline.Item;

export default class TimelinePanel extends React.Component {
  render() {
    return (
      <div className="panel timeline-panel panel-default">
        <div className="panel-heading">
          <Icon type="calendar"/> 操作记录
        </div>
        <div className="panel-body">
          <Timeline pending={<a href="#">查看更多</a>}>
            {this.props.data.map((data, i) =>
              <TimelineItem key={i} color={data.color}>
                <div className="timeline-item-panel">
                  <div className="timeline-title">
                    <h4>{data.title}</h4>
                    <p>
                      <small className="text-muted">
                        <Icon type="clock-circle-o" />{data.datetime}
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
        </div>
      </div>
    );

  }
}
