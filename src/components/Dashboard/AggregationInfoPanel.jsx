import React from 'react';
import classnames from 'classnames';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

export default function AggregationInfoPanel(props) {
  return (
    <div className={classnames('panel', `panel-${props.type}`, 'aggregation-info-panel')}>
      <div className="panel-heading">
        <Row type="flex">
          <Col span="6">
            <Icon type={props.iconType} className="anticon-6x" />
          </Col>
          <Col span="18" className="text-right">
            <div >{props.title}</div>
            <div className="font-huge">
              {props.value}
            </div>
          </Col>
        </Row>
      </div>
      <div className="panel-footer">

        <a href="#">
          <div>
            查看更多 <Icon type="caret-circle-right" className="pull-right" />
          </div>
        </a>
      </div>
    </div>
  );
}

AggregationInfoPanel.propTypes = {
  type: React.PropTypes.string.isRequired,
  iconType: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
};
